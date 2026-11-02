export interface DigitalProduct {
  id: string;
  title: string;
  shortTitle: string;
  subtitle?: string;
  category: '3D & CAD' | 'Audio & Music' | 'Graphic Design' | 'Architecture' | 'Video & VFX' | 'Utilities & OS';
  price: number;
  originalPrice: number;
  currency: string;
  version: string;
  os: ('windows' | 'mac' | 'linux')[];
  licenseType: 'Lifetime License' | 'Annual Subscription' | 'Enterprise Multiseat';
  instantDelivery: boolean;
  
  // Visual Box Styling
  boxStyle: {
    bgGradient: string; // e.g. "from-sky-700 via-sky-600 to-sky-900"
    textColor: string;
    accentColor: string;
    logoText: string;
    badgeText?: string;
    customImageUrl?: string;
    illustrationType?: 'wireframe-house' | 'waveform' | 'palette' | 'cube' | 'disc' | 'gear' | 'scissors';
  };

  // Delivery & Digital Content
  deliveryDetails: {
    fileSize: string;
    downloadSpeed: string;
    sampleKey: string;
    installerUrl: string;
    format: string; // "EXE + DMG Installer", "ISO Image", etc.
  };

  description: string;
  features: string[];
  systemRequirements: {
    os: string;
    cpu: string;
    ram: string;
    storage: string;
    graphics?: string;
  };

  rating: number;
  reviewsCount: number;
  salesCount: number;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  createdAt: string;
}

export interface CartItem {
  product: DigitalProduct;
  quantity: number;
  selectedOs: 'windows' | 'mac';
}

export interface OrderConfirmation {
  orderId: string;
  customerEmail: string;
  customerName: string;
  items: {
    product: DigitalProduct;
    quantity: number;
    licenseKey: string;
    downloadUrl: string;
    selectedOs: string;
  }[];
  totalAmount: number;
  currency: string;
  createdAt: string;
}
