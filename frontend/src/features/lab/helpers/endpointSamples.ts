const endpointSamples = {
  '/health': {
    data: {
      status: 'ok'
    },
    meta: {
      requestId: 'sample-request-id'
    }
  },
  '/api/v1/apod': {
    data: {
      title: 'Alpha Centauri: The Closest Star System',
      date: '2025-01-01',
      mediaType: 'image',
      explanation:
        'The closest star system to the Sun is the Alpha Centauri system. Of the three stars in the system, the dimmest -- called Proxima Centauri -- is actually the nearest star.',
      imageUrl: 'https://apod.nasa.gov/apod/image/2501/AlphaCen_Cantrell_960.jpg',
      hdImageUrl: 'https://apod.nasa.gov/apod/image/2501/AlphaCen_Cantrell_3429.jpg',
      copyright: "Telescope Live, Heaven's Mirror Observatory; Processing: Chris Cantrell"
    },
    meta: {
      requestId: 'sample-request-id',
      cached: false,
      source: 'nasa-apod'
    }
  },
  '/api/v1/asteroids/feed': {
    data: {
      range: {
        startDate: '2025-01-01',
        endDate: '2025-01-01'
      },
      counts: {
        total: 1
      },
      asteroids: [
        {
          id: '3561029',
          name: '(2011 GE3)',
          hazardous: false,
          diameterKmMin: 0.0177237239,
          diameterKmMax: 0.0396314515,
          closeApproachDate: '2025-01-01',
          missDistanceKm: 49668157.47533864,
          velocityKph: 29942.4840770101
        }
      ]
    },
    meta: {
      requestId: 'sample-request-id',
      cached: false,
      source: 'nasa-neows'
    }
  },
  '/api/v1/images/search': {
    data: {
      items: [
        {
          nasaId: 'PIA12235',
          title: 'Nearside of the Moon',
          description: 'Nearside of the Moon',
          mediaType: 'image',
          dateCreated: '2009-09-24T18:00:22Z',
          previewImageUrl: 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~medium.jpg',
          originalImageUrl: 'https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg'
        },
        {
          nasaId: 'PIA13517',
          title: 'Color of the Moon',
          description: 'Color of the Moon',
          mediaType: 'image',
          dateCreated: '2010-09-10T22:24:40Z',
          previewImageUrl: 'https://images-assets.nasa.gov/image/PIA13517/PIA13517~small.jpg',
          originalImageUrl: 'https://images-assets.nasa.gov/image/PIA13517/PIA13517~orig.jpg'
        }
      ],
      page: 1,
      pageSize: 100,
      totalHits: 18582,
      hasNextPage: true
    },
    meta: {
      requestId: 'sample-request-id',
      cached: false,
      source: 'nasa-image-library'
    }
  },
  '/api/v1/epic/natural': {
    data: [
      {
        identifier: '20250101001751',
        caption: "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft",
        image: 'epic_1b_20250101001751',
        date: '2025-01-01 00:13:03',
        centroidCoordinates: {
          lat: -29.567871,
          lon: 174.118652
        },
        archiveUrl: 'https://epic.gsfc.nasa.gov/archive/natural/2025/01/01/png/epic_1b_20250101001751.png'
      },
      {
        identifier: '20250101020554',
        caption: "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft",
        image: 'epic_1b_20250101020554',
        date: '2025-01-01 02:01:05',
        centroidCoordinates: {
          lat: -29.538574,
          lon: 147.121582
        },
        archiveUrl: 'https://epic.gsfc.nasa.gov/archive/natural/2025/01/01/png/epic_1b_20250101020554.png'
      }
    ],
    meta: {
      requestId: 'sample-request-id',
      cached: false,
      source: 'nasa-epic'
    }
  },
  '/api/v1/epic/natural/latest': {
    data: [
      {
        identifier: '20260325001752',
        caption: "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft",
        image: 'epic_1b_20260325001752',
        date: '2026-03-25 00:13:03',
        centroidCoordinates: {
          lat: 6.657715,
          lon: 173.891602
        },
        archiveUrl: 'https://epic.gsfc.nasa.gov/archive/natural/2026/03/25/png/epic_1b_20260325001752.png'
      },
      {
        identifier: '20260325020553',
        caption: "This image was taken by NASA's EPIC camera onboard the NOAA DSCOVR spacecraft",
        image: 'epic_1b_20260325020553',
        date: '2026-03-25 02:01:05',
        centroidCoordinates: {
          lat: 6.70166,
          lon: 146.865234
        },
        archiveUrl: 'https://epic.gsfc.nasa.gov/archive/natural/2026/03/25/png/epic_1b_20260325020553.png'
      }
    ],
    meta: {
      requestId: 'sample-request-id',
      cached: false,
      source: 'nasa-epic'
    }
  }
} as const;

export const getEndpointSample = (path: string): string | null => {
  const sample = endpointSamples[path as keyof typeof endpointSamples];

  if (!sample) {
    return null;
  }

  return JSON.stringify(sample, null, 2);
};
