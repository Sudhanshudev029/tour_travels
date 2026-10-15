export interface Testimonial { id: string; quote: string; name: string; from: string }

/**
 * Add ONLY genuine, permissioned customer reviews here, then set `business.showTestimonials`
 * to true in config/business.ts. Never publish invented reviews or star ratings.
 */
export const testimonials: readonly Testimonial[] = []
