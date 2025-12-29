const mongoose = require("mongoose");

const RowDataSchema = new mongoose.Schema(
  {},
  {
    strict: false,
    _id: false
  }
);

const SampleTableSchema = new mongoose.Schema(
  {
    tableName: {
      type: String,
      required: true
    },
    columns: [
      {
        _id: false,
        columnName: {
          type: String,
          required: true
        },
        dataType: {
          type: String,
          required: true
        }
      }
    ],
    rows: [RowDataSchema]
  },
  { _id: false }
);

const ExpectedOutputSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true
    },
    value: {
      type: mongoose.Schema.Types.Mixed,
      required: true
    }
  },
  { _id: false }
);

const AssignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  sampleTables: [SampleTableSchema],
  expectedOutput: {
    type: ExpectedOutputSchema,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

AssignmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
