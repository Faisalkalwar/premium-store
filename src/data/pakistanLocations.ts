// Comprehensive dataset of Pakistani Provinces/Territories and their major cities

export interface ProvinceInfo {
  name: string;
  code: string;
  cities: string[];
}

export const PAKISTAN_PROVINCES: ProvinceInfo[] = [
  {
    name: 'Punjab',
    code: 'PB',
    cities: [
      'Lahore',
      'Faisalabad',
      'Rawalpindi',
      'Gujranwala',
      'Multan',
      'Sialkot',
      'Bahawalpur',
      'Sargodha',
      'Sheikhupura',
      'Gujrat',
      'Jhelum',
      'Rahim Yar Khan',
      'Dera Ghazi Khan',
      'Kasur',
      'Okara',
      'Sahiwal',
      'Mianwali',
      'Attock',
      'Chakwal',
      'Hafizabad',
      'Narowal',
      'Vehari',
      'Khanewal',
      'Bahawalnagar',
      'Bhakkar',
      'Chiniot',
      'Jhang',
      'Khushab',
      'Layyah',
      'Lodhran',
      'Mandi Bahauddin',
      'Muzaffargarh',
      'Nankana Sahib',
      'Pakpattan',
      'Rajanpur',
      'Toba Tek Singh',
      'Murree',
      'Kamoke',
      'Burewala',
      'Wazirabad',
      'Taxila',
    ],
  },
  {
    name: 'Sindh',
    code: 'SD',
    cities: [
      'Karachi',
      'Hyderabad',
      'Sukkur',
      'Larkana',
      'Nawabshah',
      'Mirpur Khas',
      'Jacobabad',
      'Shikarpur',
      'Dadu',
      'Thatta',
      'Badin',
      'Tando Adam',
      'Tando Allahyar',
      'Khairpur',
      'Ghotki',
      'Kandhkot',
      'Kashmore',
      'Kotri',
      'Matiari',
      'Mehar',
      'Moro',
      'Shahdadkot',
      'Umerkot',
      'Jamshoro',
      'Sehwan',
      'Naushahro Feroze',
    ],
  },
  {
    name: 'Khyber Pakhtunkhwa (KPK)',
    code: 'KPK',
    cities: [
      'Peshawar',
      'Mardan',
      'Abbottabad',
      'Mingora',
      'Kohat',
      'Bannu',
      'Dera Ismail Khan',
      'Swat',
      'Nowshera',
      'Charsadda',
      'Mansehra',
      'Haripur',
      'Swabi',
      'Batkhela',
      'Timergara',
      'Hangu',
      'Karak',
      'Tank',
      'Chitral',
      'Dir',
      'Shangla',
      'Buner',
      'Malakand',
    ],
  },
  {
    name: 'Balochistan',
    code: 'BA',
    cities: [
      'Quetta',
      'Gwadar',
      'Turbat',
      'Khuzdar',
      'Chaman',
      'Sibi',
      'Zhob',
      'Loralai',
      'Hub',
      'Dera Murad Jamali',
      'Kalat',
      'Mastung',
      'Pishin',
      'Nushki',
      'Kharan',
      'Usta Muhammad',
      'Jaffarabad',
      'Kohlu',
    ],
  },
  {
    name: 'Islamabad Capital Territory (ICT)',
    code: 'ICT',
    cities: ['Islamabad'],
  },
  {
    name: 'Azad Jammu & Kashmir (AJK)',
    code: 'AJK',
    cities: [
      'Muzaffarabad',
      'Mirpur',
      'Rawalakot',
      'Kotli',
      'Bagh',
      'Bhimber',
      'Pallandri',
      'Hattian Bala',
      'Haveli',
      'Neelum Valley',
    ],
  },
  {
    name: 'Gilgit-Baltistan (GB)',
    code: 'GB',
    cities: [
      'Gilgit',
      'Skardu',
      'Hunza',
      'Chilas',
      'Ghizer',
      'Astore',
      'Diamer',
      'Ghangche',
      'Nagar',
      'Shigar',
    ],
  },
];

/**
 * Validates a Pakistani Full Name
 * - Required, min 3 characters
 * - Only normal letters, spaces, apostrophe, hyphen
 */
export function validatePakistanFullName(name: string): { isValid: boolean; error?: string } {
  const trimmed = (name || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter your full name.' };
  }
  if (trimmed.length < 3) {
    return { isValid: false, error: 'Please enter your full name.' };
  }
  // Allow letters (including unicode / english), spaces, apostrophes, hyphens
  const nameRegex = /^[a-zA-Z\u00C0-\u024F\u0600-\u06FF\s'\-]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter your full name.' };
  }
  return { isValid: true };
}

/**
 * Validates and normalizes Pakistani Mobile Numbers
 * Acceptable input formats:
 * - 03001234567
 * - +923001234567
 * - +92 300 1234567
 * - 0300 1234567
 * - 923001234567
 *
 * Normalizes to: +923001234567
 */
export function validatePakistanMobile(rawPhone: string): {
  isValid: boolean;
  normalized?: string;
  error?: string;
} {
  const trimmed = (rawPhone || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter a valid Pakistani mobile number.' };
  }

  // Reject if contains alphabetic characters
  if (/[a-zA-Z]/.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid Pakistani mobile number.' };
  }

  // Strip all non-digit characters except a leading '+'
  let cleaned = trimmed.replace(/[\s\-\(\)\.]/g, '');

  let normalized = '';

  if (cleaned.startsWith('+92')) {
    const afterPlus92 = cleaned.substring(3);
    // Pakistani mobile number must start with 3 and have exactly 10 digits
    if (/^3\d{9}$/.test(afterPlus92)) {
      normalized = `+92${afterPlus92}`;
    }
  } else if (cleaned.startsWith('03')) {
    const afterZero = cleaned.substring(1);
    if (/^3\d{9}$/.test(afterZero)) {
      normalized = `+92${afterZero}`;
    }
  } else if (cleaned.startsWith('92') && !cleaned.startsWith('920')) {
    const after92 = cleaned.substring(2);
    if (/^3\d{9}$/.test(after92)) {
      normalized = `+92${after92}`;
    }
  } else if (cleaned.startsWith('3')) {
    if (/^3\d{9}$/.test(cleaned)) {
      normalized = `+92${cleaned}`;
    }
  }

  if (!normalized) {
    return { isValid: false, error: 'Please enter a valid Pakistani mobile number.' };
  }

  return { isValid: true, normalized };
}

/**
 * Validates Email Address
 * - Required
 * - Must be valid email format with @ and valid domain
 * - No spaces
 */
export function validateEmailAddress(email: string): { isValid: boolean; error?: string } {
  const trimmed = (email || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  // Check for spaces anywhere
  if (/\s/.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  // Standard robust email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.' };
  }
  return { isValid: true };
}

/**
 * Validates Pakistani Province
 */
export function validateProvince(province: string): { isValid: boolean; error?: string } {
  const trimmed = (province || '').trim();
  if (!trimmed) {
    return { isValid: false, error: 'Please select a Pakistani province or territory.' };
  }
  const match = PAKISTAN_PROVINCES.some(
    (p) => p.name.toLowerCase() === trimmed.toLowerCase()
  );
  if (!match) {
    return { isValid: false, error: 'Please select a Pakistani province or territory.' };
  }
  return { isValid: true };
}

/**
 * Validates Pakistani City for a given Province
 */
export function validateCity(province: string, city: string): { isValid: boolean; error?: string } {
  const trimmedCity = (city || '').trim();
  if (!trimmedCity) {
    return { isValid: false, error: 'Please select a valid Pakistani city.' };
  }
  const provObj = PAKISTAN_PROVINCES.find(
    (p) => p.name.toLowerCase() === (province || '').trim().toLowerCase()
  );
  if (!provObj) {
    return { isValid: false, error: 'Please select a Pakistani province or territory.' };
  }
  const cityMatch = provObj.cities.some(
    (c) => c.toLowerCase() === trimmedCity.toLowerCase()
  );
  if (!cityMatch) {
    return { isValid: false, error: 'Please select a valid Pakistani city.' };
  }
  return { isValid: true };
}

/**
 * Validates Area / District
 * - Required, min 2 characters
 */
export function validateArea(area: string): { isValid: boolean; error?: string } {
  const trimmed = (area || '').trim();
  if (!trimmed || trimmed.length < 2) {
    return { isValid: false, error: 'Please enter your area or district.' };
  }
  return { isValid: true };
}

/**
 * Validates Complete Street Address
 * - Required, min 10 characters
 */
export function validateStreetAddress(address: string): { isValid: boolean; error?: string } {
  const trimmed = (address || '').trim();
  if (!trimmed || trimmed.length < 10) {
    return { isValid: false, error: 'Please enter your complete delivery address.' };
  }
  return { isValid: true };
}
