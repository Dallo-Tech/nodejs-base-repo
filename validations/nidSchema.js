const { z } = require('zod');

const nidSchema = z.object({
    full_name: z.string().max(100),
    dob: z.string().or(z.date()), // Accepts both string and Date objects
    birth_place: z.string().max(100),
    gender: z.enum(['Male', 'Female', 'Other']),
    citizenship_number: z.string().max(50),
    citizenship_issue_district: z.string().max(100),
    permanent_address: z.string(),
    temporary_address: z.string(),
    contact_number: z.string().max(15),
    email: z.string().email().max(100).nullable(), // Can be null
    emergency_contact_name: z.string().max(100),
    emergency_contact_number: z.string().max(15),
    issue_date: z.string().or(z.date()),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional()
});

module.exports = nidSchema;