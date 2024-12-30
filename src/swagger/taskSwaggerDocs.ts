const tasksSwaggerDocs = {
  "/api/tasks": {
    post: {
      summary: "Create a new task",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              required: ["title"],
              properties: {
                title: { type: "string", description: "Title of the task" },
                description: {
                  type: "string",
                  description: "Optional description of the task",
                },
              },
            },
          },
        },
      },
      responses: {
        201: {
          description: "Task created successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  completed: { type: "boolean" },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        400: {
          description: "Validation Error",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  errors: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        msg: { type: "string" },
                        param: { type: "string" },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        401: {
          description: "Unauthorized - Invalid or missing token",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  error: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    get: {
      summary: "Get all tasks",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "query",
          name: "status",
          required: false,
          schema: {
            type: "string",
            enum: ["completed", "pending"],
          },
          description: "Filter tasks by status",
        },
      ],
      responses: {
        200: {
          description: "List of tasks",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    title: { type: "string" },
                    description: { type: "string" },
                    completed: { type: "boolean" },
                    createdAt: { type: "string", format: "date-time" },
                  },
                },
              },
            },
          },
        },
        400: { description: "Invalid status parameter" },
        401: { description: "Unauthorized - Invalid or missing token" },
      },
    },
  },
  "/api/tasks/{id}": {
    get: {
      summary: "Get a task by ID",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID of the task to retrieve",
        },
      ],
      responses: {
        200: {
          description: "Task found",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  completed: { type: "boolean" },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        401: { description: "Unauthorized - Invalid or missing token" },
        404: { description: "Task not found" },
      },
    },
    put: {
      summary: "Update a task",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID of the task to update",
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                title: {
                  type: "string",
                  description: "Updated title of the task",
                },
                description: {
                  type: "string",
                  description: "Updated description of the task",
                },
                completed: {
                  type: "boolean",
                  description: "Updated status of the task",
                },
              },
            },
          },
        },
      },
      responses: {
        200: {
          description: "Task updated successfully",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  title: { type: "string" },
                  description: { type: "string" },
                  completed: { type: "boolean" },
                  createdAt: { type: "string", format: "date-time" },
                },
              },
            },
          },
        },
        400: { description: "Validation Error" },
        401: { description: "Unauthorized - Invalid or missing token" },
        404: { description: "Task not found" },
      },
    },
    delete: {
      summary: "Delete a task",
      tags: ["Tasks"],
      security: [{ bearerAuth: [] }],
      parameters: [
        {
          in: "path",
          name: "id",
          required: true,
          schema: { type: "string" },
          description: "ID of the task to delete",
        },
      ],
      responses: {
        204: { description: "Task deleted successfully" },
        401: { description: "Unauthorized - Invalid or missing token" },
        404: { description: "Task not found" },
      },
    },
  },
};

export default tasksSwaggerDocs;
