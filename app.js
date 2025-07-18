import express from "express";
import path from "path";
import methodOverride from "method-override"; // Importing method-override to handle PUT and DELETE requests in forms
import bodyParser from "body-parser";
import { v4 as uuidv4 } from 'uuid';
import morgan from 'morgan'; // Importing morgan for logging HTTP requests

const app = express();
const port = 3000;

// Set up middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(methodOverride("_method"));
app.use(morgan('dev')); // Logging middleware for development

// Set up EJS as the templating engine
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "views"));

let blogs = [
  {
    id: uuidv4(), // Using uuid for unique IDs
    title: "Getting Started with Node.js",
    snippet:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    body: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient. Node.js' package ecosystem, npm, is the largest ecosystem of open source libraries in the world.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Express.js Fundamentals",
    snippet:
      "Express is a minimal and flexible Node.js web application framework.",
    body: "Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "EJS Templating",
    snippet:
      "EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.",
    body: "EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. No religiousness about how to organize things. No reinvention of iteration and control-flow. It's just plain JavaScript.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Understanding Middleware in Express",
    snippet:
      "Middleware functions are functions that have access to the request object, the response object, and the next middleware function.",
    body: "In Express, middleware functions are used to handle requests and responses. They can perform tasks such as logging, authentication, and modifying request and response objects. Understanding how to use middleware effectively is crucial for building robust applications.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Building RESTful APIs with Node.js",
    snippet: "Learn how to build RESTful APIs using Node.js and Express.",
    body: "RESTful APIs are a standard way to build web services. In this blog, we will explore how to create a RESTful API using Node.js and Express, covering routing, request handling, and response formatting.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Introduction to MongoDB",
    snippet:
      "MongoDB is a NoSQL database that uses a document-oriented data model.",
    body: "MongoDB is a popular NoSQL database that stores data in flexible, JSON-like documents. This blog will introduce you to MongoDB, its features, and how to integrate it with Node.js applications.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Using Mongoose for MongoDB",
    snippet:
      "Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.",
    body: "Mongoose provides a straightforward way to model your data and interact with MongoDB. In this blog, we will cover how to set up Mongoose, define schemas, and perform CRUD operations.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Error Handling in Express",
    snippet:
      "Learn how to handle errors in your Express applications effectively.",
    body: "Error handling is an essential part of building robust applications. This blog will discuss various strategies for handling errors in Express, including custom error handlers and middleware.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Authentication in Node.js",
    snippet: "Implementing authentication in your Node.js applications.",
    body: "Authentication is crucial for securing your applications. In this blog, we will explore different authentication strategies in Node.js, including session-based and token-based authentication.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Deploying Node.js Applications",
    snippet: "A guide to deploying your Node.js applications to production.",
    body: "Deploying your Node.js application can be challenging. This blog will provide a step-by-step guide on how to deploy your application using popular platforms like Heroku and AWS.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "WebSockets in Node.js",
    snippet: "Real-time communication with WebSockets in Node.js.",
    body: "WebSockets allow for real-time communication between the client and server. In this blog, we will explore how to implement WebSockets in a Node.js application using the Socket.io library.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Unit Testing in Node.js",
    snippet: "Learn how to write unit tests for your Node.js applications.",
    body: "Unit testing is essential for maintaining code quality. This blog will cover how to set up a testing environment in Node.js using frameworks like Mocha and Chai.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Using TypeScript with Node.js",
    snippet: "Enhance your Node.js applications with TypeScript.",
    body: "TypeScript is a superset of JavaScript that adds static typing. In this blog, we will discuss how to set up TypeScript in a Node.js project and the benefits it brings to your development process.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "GraphQL vs REST",
    snippet: "Comparing GraphQL and REST for API development.",
    body: "GraphQL is an alternative to REST for building APIs. This blog will compare the two approaches, discussing their advantages and disadvantages, and when to use each.",
    createdAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    title: "Performance Optimization in Node.js",
    snippet:
      "Tips and techniques for optimizing the performance of your Node.js applications.",
    body: "Performance is critical for user satisfaction. In this blog, we will explore various techniques for optimizing the performance of Node.js applications, including caching, clustering, and asynchronous programming.",
    createdAt: new Date().toISOString(),
  },
];

// Redirect root to /blogs
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Route to render the blogs page
// This will render the index.ejs file located in the views directory
app.get("/blogs", (req, res) => {
  res.render("index", { title: "All Blogs", blogs }); // Pass the blogs array to the EJS template
});

// New blog route
app.get("/blogs/new", (req, res) => {
  res.render("create", { title: "Create New Blog" }); // Render the new blog form
});

// Create a new blog
app.post("/blogs", (req, res) => {
  const { title, snippet, body } = req.body; // Destructure the request body
  const newBlog = {
    id: uuidv4(), // Simple ID generation
    title: title,
    snippet: snippet,
    body: body,
    createdAt: new Date().toISOString(),
  };
  blogs.push(newBlog); // Add the new blog to the blogs array
  res.redirect("/blogs"); // Redirect to the blogs page after creating a new blog
});

// Route to render a specific blog post
app.get("/blogs/:id", (req, res) => {
  const blogId = req.params.id; // Get the blog ID from the URL
  const blog = blogs.find((b) => b.id === blogId); // Find the blog by ID
  if (blog) {
    res.render("details", { title: blog.title, blog }); // Render the blog page with the found blog
  } else {
    res.status(404).render("404", { title: "Blog Not Found" }); // Handle case where blog is not found
  }
});

// Route to handle edit blog requests
app.get("/blogs/:id/edit", (req, res) => {
  const blogId = req.params.id; // Get the blog ID from the URL
  const blog = blogs.find((b) => b.id === blogId); // Find the blog by ID
  if (blog) {
    res.render("edit", { title: `Edit ${blog.title}`, blog }); // Render the edit form with the found blog
  } else {
    res.status(404).render("404", { title: "Blog Not Found" }); // Handle case where blog is not found
  }
});

// Update a blog
app.put("/blogs/:id", (req, res) => {
  const blogId = req.params.id; // Get the blog ID from the URL
  const { title, snippet, body } = req.body; // Destructure the request body
  const blogIndex = blogs.findIndex((b) => b.id === blogId); // Find the index of the blog by ID
  if (blogIndex !== -1) {
    // Update the blog if found
    blogs[blogIndex] = {
      id: blogId,
      title: title,
      snippet: snippet,
      body: body,
      createdAt: new Date().toISOString(),
    };
    res.redirect(`/blogs/${blogId}`); // Redirect to the updated blog page
  } else {
    res.status(404).render("404", { title: "Blog Not Found" }); // Handle case where blog is not found
  }
});

// Delete a blog
app.delete("/blogs/:id", (req, res) => {
  const blogId = req.params.id; // Get the blog ID from the URL
  const blogIndex = blogs.findIndex((b) => b.id === blogId); // Find the index of the blog by ID
  if (blogIndex !== -1) {
    blogs.splice(blogIndex, 1); // Remove the blog from the array
    res.redirect("/blogs"); // Redirect to the blogs page after deletion
  } else {
    res.status(404).render("404", { title: "Blog Not Found" }); // Handle case where blog is not found
  }
});

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404 Not Found' });
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
