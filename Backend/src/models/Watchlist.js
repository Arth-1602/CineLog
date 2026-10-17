import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema(
  {
    visitorId: {
      type: String,
      required: [true, 'Visitor ID is required'],
      trim: true,
      index: true
    },
    titleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Title',
      required: [true, 'Title ID is required'],
      index: true
    }
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
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

// Prevent duplicate entries for the same visitor
watchlistSchema.index({ visitorId: 1, titleId: 1 }, { unique: true });

export const Watchlist = mongoose.models.Watchlist || mongoose.model('Watchlist', watchlistSchema);
