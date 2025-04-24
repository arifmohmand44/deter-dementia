export const Conversions = {
    Height_in_meter: {
        oppositeKey: 'Height_in_feet',
        factor: 3.28084,
        precision: 2
    },
    Height_in_feet: {
        oppositeKey: 'Height_in_meter',
        factor: 0.3048,
        precision: 2
    },
    Weight_in_kilogram: {
        oppositeKey: 'Weight_in_pound',
        factor: 2.20462,
        precision: 2
    },
    Weight_in_pound: {
        oppositeKey: 'Weight_in_kilogram',
        factor: 0.453592,
        precision: 2
    }
} as const;