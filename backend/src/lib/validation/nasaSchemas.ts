import { z } from 'zod';

export const apodResponseSchema = z.object({
  title: z.string(),
  date: z.string(),
  media_type: z.string(),
  explanation: z.string(),
  url: z.string().url().optional(),
  hdurl: z.string().url().optional(),
  copyright: z.string().optional()
});

const closeApproachSchema = z.object({
  close_approach_date: z.string(),
  relative_velocity: z.object({
    kilometers_per_hour: z.string()
  }),
  miss_distance: z.object({
    kilometers: z.string()
  })
});

const neoSchema = z.object({
  id: z.string(),
  name: z.string(),
  is_potentially_hazardous_asteroid: z.boolean(),
  estimated_diameter: z.object({
    kilometers: z.object({
      estimated_diameter_min: z.number(),
      estimated_diameter_max: z.number()
    })
  }),
  close_approach_data: z.array(closeApproachSchema)
});

export const asteroidFeedSchema = z.object({
  near_earth_objects: z.record(z.string(), z.array(neoSchema))
});

export const imageSearchSchema = z.object({
  collection: z.object({
    metadata: z.object({
      total_hits: z.number().optional()
    }).optional(),
    items: z.array(z.object({
      data: z.array(z.object({
        nasa_id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        media_type: z.string(),
        date_created: z.string()
      })).nonempty(),
      links: z.array(z.object({
        href: z.string().url(),
        rel: z.string().optional(),
        render: z.string().optional()
      })).optional()
    })),
    links: z.array(z.object({
      rel: z.string(),
      href: z.string().url()
    })).optional()
  })
});

export const epicItemSchema = z.object({
  identifier: z.string(),
  caption: z.string(),
  image: z.string(),
  date: z.string(),
  centroid_coordinates: z.object({
    lat: z.number(),
    lon: z.number()
  }).nullable().optional()
});

export const epicCollectionSchema = z.array(epicItemSchema);
