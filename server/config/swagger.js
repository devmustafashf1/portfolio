export const swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Portfolio Blog API",
    version: "1.0.0",
    description:
      "REST API for managing blog posts. Authenticate with the JWT token from `POST /auth/login` as a Bearer token.",
  },
  servers: [
    {
      url: process.env.API_URL || "http://localhost:5000",
      description: "API Server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "JWT token from POST /auth/login",
      },
    },
    schemas: {
      Blog: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          title: { type: "string" },
          author: { type: "string" },
          excerpt: { type: "string" },
          content: { type: "string", description: "Markdown content" },
          tags: { type: "array", items: { type: "string" } },
          read_time: { type: "integer" },
          pinned: { type: "boolean" },
          created_at: { type: "string", format: "date-time" },
        },
      },
      CreateBlogBody: {
        type: "object",
        required: ["title", "author", "excerpt", "content"],
        properties: {
          title: { type: "string", example: "My First Blog Post" },
          author: { type: "string", example: "Mustafa Shafique" },
          excerpt: {
            type: "string",
            example: "A brief description of the post",
          },
          content: {
            type: "string",
            example: "## Introduction\n\nThis is my blog post...",
          },
          tags: {
            type: "string",
            example: "react, typescript, backend",
            description: "Comma-separated tags",
          },
          read_time: { type: "integer", example: 5 },
          pinned: { type: "boolean", example: false },
        },
      },
      LoginBody: {
        type: "object",
        required: ["username", "password"],
        properties: {
          username: { type: "string", example: "mustafa" },
          password: { type: "string", example: "yourpassword" },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: { type: "string" },
          user: {
            type: "object",
            properties: { username: { type: "string" } },
          },
        },
      },
    },
  },
  paths: {
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Admin login — returns JWT",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginBody" },
            },
          },
        },
        responses: {
          200: {
            description: "Login successful",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginResponse" },
              },
            },
          },
          401: { description: "Invalid credentials" },
        },
      },
    },
    "/read/blog": {
      post: {
        tags: ["Blogs"],
        summary: "Create a blog post",
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CreateBlogBody" },
            },
          },
        },
        responses: {
          201: {
            description: "Blog created",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    blog: { $ref: "#/components/schemas/Blog" },
                  },
                },
              },
            },
          },
          400: { description: "Missing required fields" },
          401: { description: "No token provided" },
          403: { description: "Invalid or expired token" },
        },
      },
    },
    "/read/": {
      get: {
        tags: ["Blogs"],
        summary: "Get all blog posts",
        responses: {
          200: {
            description: "Array of blog posts",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Blog" } },
              },
            },
          },
        },
      },
    },
    "/read/pinned": {
      get: {
        tags: ["Blogs"],
        summary: "Get pinned blog posts",
        responses: {
          200: {
            description: "Array of pinned blog posts",
            content: {
              "application/json": {
                schema: { type: "array", items: { $ref: "#/components/schemas/Blog" } },
              },
            },
          },
        },
      },
    },
    "/read/{id}": {
      get: {
        tags: ["Blogs"],
        summary: "Get a blog post by ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string", format: "uuid" },
          },
        ],
        responses: {
          200: {
            description: "Blog post",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Blog" },
              },
            },
          },
          404: { description: "Blog not found" },
        },
      },
    },
  },
};
