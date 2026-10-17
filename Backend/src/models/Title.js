import mongoose from 'mongoose';

const titleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title name is required'],
      trim: true,
      index: true
    },
    type: {
      type: String,
      required: [true, 'Type is required'],
      enum: {
        values: ['movie', 'tv'],
        message: 'Type must be either "movie" or "tv"'
      },
      index: true
    },
    synopsis: {
      type: String,
      required: [true, 'Synopsis is required'],
      trim: true
    },
    releaseYear: {
      type: Number,
      required: [true, 'Release year is required'],
      min: 1888,
      max: 2100,
      index: true
    },
    genres: {
      type: [String],
      required: true,
      default: [],
      index: true
    },
    language: {
      type: String,
      required: [true, 'Language is required'],
      trim: true,
      index: true
    },
    moodTags: {
      type: [String],
      required: true,
      default: [],
      index: true
    },
    rating: {
      type: Number,
      min: 0,
      max: 10,
      default: 0,
      index: true
    },
    voteCount: {
      type: Number,
      default: 0
    },
    runtime: {
      type: String,
      default: null,
      trim: true
    },
    posterPath: {
      type: String,
      default: '',
      trim: true
    },
    backdropPath: {
      type: String,
      default: '',
      trim: true
    },
    director: {
      type: String,
      default: '',
      trim: true
    },
    cast: {
      type: [String],
      default: []
    },
    tagline: {
      type: String,
      default: '',
      trim: true
    },
    featured: {
      type: Boolean,
      default: false,
      index: true
    },
    trending: {
      type: Boolean,
      default: false,
      index: true
    },
    popular: {
      type: Boolean,
      default: false,
      index: true
    },
    externalProviderId: {
      type: String,
      default: null,
      index: true
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      }
    }
  }
);

// Compound text index for robust full-text search
titleSchema.index({
  title: 'text',
  synopsis: 'text',
  director: 'text',
  cast: 'text'
});

export const Title = mongoose.models.Title || mongoose.model('Title', titleSchema);
