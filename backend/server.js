import express from "express"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import mysql from "mysql"
import bodyParser from "body-parser"
import cors from "cors"
import { OpenAI } from "openai" // Correctly import OpenAI
import dotenv from "dotenv"
import http from "http"
import { Server } from "socket.io"
import multer from "multer"

// Get the directory name for ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const uploadsDir = path.join(__dirname, "uploads")

// Create uploads directory if it doesn't exist
if (!fs.existsSync(uploadsDir)) {
  console.log("Creating uploads directory...")
  fs.mkdirSync(uploadsDir, { recursive: true })
}

const app = express()
const port = 5001

app.use(cors())
app.use(bodyParser.json())

dotenv.config()

// In multer storage, store the relative path, not the full URL
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
    const filePath = path.join("uploads", uniqueSuffix + "-" + file.originalname)
    cb(null, filePath) // Store relative file path like 'uploads/filename'
  },
})



const upload = multer({ storage })

// Export `upload` for use in routes
export default upload

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5174", // React frontend origin
    methods: ["GET", "POST"],
  },
})

const onlineUsers = {}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id)

  // User joins with a specific user ID
  socket.on("join", (userId) => {
    onlineUsers[userId] = socket.id
    io.emit("onlineUsers", onlineUsers) // Notify all users about the online users
  })

  // // Handle private messages
  socket.on("privateMessage", ({ to, message, from }) => {
    if (onlineUsers[to]) {
      io.to(onlineUsers[to]).emit("message", { message, from })
    }
  })

  // User disconnects
  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      if (onlineUsers[userId] === socket.id) {
        delete onlineUsers[userId]
        break
      }
    }
    io.emit("onlineUsers", onlineUsers) // Update online users
    console.log("User disconnected:", socket.id)
  })
})

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correct
  baseURL: "https://api.openai.com/v1", // This might be necessary depending on the version
})

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
    })

    res.json({ reply: response.choices[0].message.content })
  } catch (error) {
    console.error("Error:", error.response ? error.response.data : error.message)
    res.status(500).json({ error: "Failed to generate response from OpenAI" })
  }
})

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pet_adoption",
})

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack)
    return
  }
  console.log("Connected to MySQL database")
})

app.post("/submit-form", (req, res) => {
  const {
    FirstName,
    LastName,
    Address,
    Phone,
    Email,
    Occupation,
    CompanyName,
    SocProfile,
    SelectedPet,
    Status,
    AdoptChoose,
    IdealPet,
    LivingCondition,
    AllergicHouseholds,
    PetCareResponsible,
    FinancialResponsible,
    VacationCare,
    AloneHours,
    IntroSteps,
    FamilySupport,
    SupportExplanation,
    OtherPets,
    PastPets,
  } = req.body

  const sql = `
    INSERT INTO adoption_application (
      first_name, last_name, address, phone, email, occupation, company_name,
      socprofile, selected_pet, user_status, adopt_choose, ideal_pet, living_condition, allergic_households, 
      pet_care_responsible, financial_responsible, vacation_care, alone_hours, intro_steps, family_support, 
      support_explanation, other_pets, past_pets
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `

  db.query(
    sql,
    [
      FirstName,
      LastName,
      Address,
      Phone,
      Email,
      Occupation,
      CompanyName,
      SocProfile,
      SelectedPet,
      Status,
      AdoptChoose,
      IdealPet,
      LivingCondition,
      AllergicHouseholds,
      PetCareResponsible,
      FinancialResponsible,
      VacationCare,
      AloneHours,
      IntroSteps,
      FamilySupport,
      SupportExplanation,
      OtherPets,
      PastPets,
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err)
        res.status(500).json({ message: "Database error" })
      } else {
        res.status(200).json({ message: "Application submitted successfully" })
      }
    },
  )
})

// Debug middleware to log image requests
app.use("/uploads", (req, res, next) => {
  console.log(`Image requested: ${req.path}`)
  next()
})

// Improved static file serving
app.use(
  "/uploads",
  express.static(uploadsDir, {
    maxAge: "1d",
    etag: true,
    lastModified: true,
    setHeaders: (res, path) => {
      res.setHeader("Cache-Control", "public, max-age=86400")
    },
  }),
)

// Add a route to check if an image exists
app.get("/check-image/:filename", (req, res) => {
  const filename = req.params.filename
  const filePath = path.join(uploadsDir, filename)

  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.log(`Image not found: ${filename}`)
      res.status(404).json({ exists: false, error: "File not found" })
    } else {
      console.log(`Image found: ${filename}`)
      res.json({ exists: true, path: `/uploads/${filename}` })
    }
  })
})

app.get("/pets", (req, res) => {
  const sql = "SELECT * FROM pets";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching pets:", err);
      res.status(500).json({ message: "Error fetching pets" });
    } else {
      console.log("Fetched pets:", results);

      // Check and normalize image paths
      results.forEach((pet) => {
        if (pet.img) {
          // Extract just the filename from the path
          const filename = pet.img.replace(/^\/?(uploads\/)?/, "");

          // Construct the full path to the image
          const imagePath = path.join(uploadsDir, filename);

          // Check if the image file exists
          const exists = fs.existsSync(imagePath);
          console.log(`Pet ${pet.pet_id} (${pet.name}) image filename: ${filename}, exists: ${exists}`);

          // If the image doesn't exist, set a default image path
          if (!exists) {
            console.log(`Warning: Image file not found for pet ${pet.pet_id} (${pet.name}): ${imagePath}`);
            pet.img = "/uploads/default.jpg"; // Set a default image path
          } else {
            pet.img = `/uploads/${filename}`; // Ensure the path is correct for the frontend
          }
        } else {
          console.log(`Pet ${pet.pet_id} (${pet.name}) has no image path`);
          pet.img = "/uploads/default.jpg"; // Set a default image path
        }
      });

      res.json(results);
    }
  });
});

app.get("/api/users", (req, res) => {
  const sql = "SELECT * FROM users"
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching users:", err)
      res.status(500).json({ message: "Database error" })
    } else {
      res.json(results)
    }
  })
})

// Start the server with http server (for socket.io)
server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})

