import mongoose from 'mongoose';

const globalStatSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
    unique: true,
  },
  totalEmissions: {
    type: Number,
    required: true,
    comment: 'Million tonnes of CO2',
  },
  countriesCovered: {
    type: Number,
    default: 196,
  },
  perCapita: {
    type: Number,
    required: true,
    comment: 'Tonnes per person',
  },
  yoyChangePercent: {
    type: Number,
    required: true,
  },
  cumulativeEmissions: {
    type: Number,
    required: false,
  }
}, {
  timestamps: true,
});

export const GlobalStat = mongoose.models.GlobalStat || mongoose.model('GlobalStat', globalStatSchema);
export default GlobalStat;
