import mongoose from 'mongoose';

const countryEmissionSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  isoCode: {
    type: String,
    required: true,
  },
  flag: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  totalEmissions: {
    type: Number,
    required: true,
    comment: 'Million tonnes of CO2',
  },
  perCapita: {
    type: Number,
    required: true,
    comment: 'Tonnes per person',
  },
  shareOfGlobal: {
    type: Number,
    required: true,
    comment: 'Percentage of world total',
  },
  rank: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

// Composite index on country and year
countryEmissionSchema.index({ country: 1, year: 1 }, { unique: true });
countryEmissionSchema.index({ year: 1, rank: 1 });

export const CountryEmission = mongoose.models.CountryEmission || mongoose.model('CountryEmission', countryEmissionSchema);
export default CountryEmission;
