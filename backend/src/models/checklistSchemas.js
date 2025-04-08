// backend/src/models/ChecklistItem.js
const mongoose = require("mongoose");

const checklistItemSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 1,
            maxlength: 200,
        },
        description: {
            type: String,
            trim: true,
            maxlength: 500,
            default: "",
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        // Card that this checklist item belongs to
        cardId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Card",
        },
        // User who created this checklist item
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        dueDate: {
            type: Date,
            default: null,
        },
        position: {
            type: Number,
            default: 0,
        },
        completedDate: {
            type: Date,
            default: null,
        }
    },
    { timestamps: true }
);


module.exports = mongoose.model("ChecklistItem", checklistItemSchema);