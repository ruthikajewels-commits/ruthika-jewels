import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  doc, 
  setDoc, 
  deleteDoc,
  query,
  where
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";

// Default configuration with placeholders to check if they're customized
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if we have valid-looking Firebase credentials
const isFirebaseEnabled = 
  firebaseConfig.apiKey && 
  firebaseConfig.apiKey !== "YOUR_API_KEY" && 
  firebaseConfig.projectId;

let firebaseApp = null;
let firestoreDb = null;
let firebaseAuth = null;
let firebaseStorage = null;

if (isFirebaseEnabled) {
  try {
    firebaseApp = initializeApp(firebaseConfig);
    firestoreDb = getFirestore(firebaseApp);
    firebaseAuth = getAuth(firebaseApp);
    firebaseStorage = getStorage(firebaseApp);
    console.log("Firebase initialized successfully.");
  } catch (error) {
    console.error("Firebase failed to initialize, falling back to Mock Database:", error);
  }
} else {
  console.log("Firebase config not found. Running website in Mock Local Database mode.");
}

// -------------------------------------------------------------
// MOCK DATA GENERATION (Used for LocalStorage fallback)
// -------------------------------------------------------------

const DEFAULT_CATEGORIES = [
  { id: "haarams", name: "Haarams", count: 4 },
  { id: "necklaces", name: "Necklaces", count: 6 },
  { id: "earrings", name: "Earrings", count: 8 },
  { id: "hipbelts", name: "Hip Belts (Vaddanam)", count: 3 },
  { id: "blackbeads", name: "Black Beads (Mangalsutra)", count: 5 },
  { id: "bangles", name: "Bangles", count: 4 }
];

const DEFAULT_BANNERS = [
  {
    id: "banner-1",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80",
    title: "Divine Heritage Collection",
    subtitle: "Handcrafted traditional temple jewellery reflecting spiritual elegance.",
    link: "/shop?category=necklaces"
  },
  {
    id: "banner-2",
    imageUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=1200&q=80",
    title: "The Golden Splendor",
    subtitle: "Up to 15% discount on all Bridal Haarams. Limited Period Offer.",
    link: "/shop?category=haarams"
  }
];

const DEFAULT_OFFERS = [
  {
    id: "offer-1",
    title: "Auspicious Shravanam Month Sale",
    description: "Get a complimentary silver coin on all orders above ₹14,999.",
    code: "SHRAVANAM",
    discount: "Free Gift"
  },
  {
    id: "offer-2",
    title: "First Order Special",
    description: "Flat ₹500 off on your first purchase of handcrafted jewellery.",
    code: "RUTHIKA500",
    discount: "₹500 Off"
  }
];

const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "Antique Kasulaperu Bridal Haaram",
    sku: "RJ-HR-001",
    category: "haarams",
    price: 48999,
    discountPrice: 42999,
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A breathtaking traditional Kasulaperu Haaram featuring miniature coins embossed with Goddess Lakshmi motifs. Handcrafted in heavy gold plating on high-quality brass, adorned with premium kemp ruby stones, emeralds, and dangling freshwater pearls.",
    specifications: "Length: 24 Inches, Weight: 120 grams, Base Metal: Brass & Copper, Plating: 22k Antique Gold Plated, Stones: Kemp Ruby & Emerald",
    warranty: "1 Year Polish Replacement Warranty. Comes with a purity certificate.",
    isNew: true,
    isBestSeller: true,
    isSoldOut: false
  },
  {
    id: "prod-2",
    name: "Lakshmi Temple Choker Necklace",
    sku: "RJ-NK-002",
    category: "necklaces",
    price: 18500,
    discountPrice: 15999,
    images: [
      "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Exquisite temple choker featuring a central figure of Goddess Lakshmi seated on a lotus. Richly embellished with ruby kemp stones and delicate gold-plated bead drops.",
    specifications: "Length: Adjustable thread back, Weight: 65 grams, Base Metal: Copper, Plating: Matte Gold Finish",
    warranty: "6 Months Polish Warranty. Keep away from water and perfume.",
    isNew: true,
    isBestSeller: false,
    isSoldOut: false
  },
  {
    id: "prod-3",
    name: "Traditional Kemp Ruby Jhumkas",
    sku: "RJ-ER-003",
    category: "earrings",
    price: 4500,
    discountPrice: 3899,
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Elegant dome-shaped Jhumkas displaying detailed floral metal carvings, handset with radiant kemp red rubies and bottom pearl tassels.",
    specifications: "Length: 2.5 Inches, Weight: 30 grams (pair), Lock Type: Push Back, Plating: Antique Gold",
    warranty: "6 Months Warranty.",
    isNew: false,
    isBestSeller: true,
    isSoldOut: false
  },
  {
    id: "prod-4",
    name: "Divine Peacock Vaddanam (Hip Belt)",
    sku: "RJ-HB-004",
    category: "hipbelts",
    price: 34500,
    discountPrice: 29500,
    images: [
      "https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80"
    ],
    description: "An elegant, adjustable bridal hip belt (Vaddanam) showcasing dancing peacocks flanked by floral vines. Perfect for weddings and festival wear.",
    specifications: "Size: Adjustable waist 26 to 40 Inches, Plating: 22k Antique Gold Polish, Stones: Kemp and Emeralds",
    warranty: "1 Year Warranty.",
    isNew: false,
    isBestSeller: false,
    isSoldOut: true
  },
  {
    id: "prod-5",
    name: "Emerald Bead Black Beads Mangalsutra",
    sku: "RJ-BB-005",
    category: "blackbeads",
    price: 8900,
    discountPrice: 7500,
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=600&q=80"
    ],
    description: "A double strand black bead chain featuring a premium hand-cut emerald bead focal pendant, surrounded by gold micro-plated spacer beads.",
    specifications: "Length: 18 Inches, Plating: Gold Micro-plated, Center Bead: Real Hydro Emerald",
    warranty: "6 Months Warranty.",
    isNew: true,
    isBestSeller: false,
    isSoldOut: false
  },
  {
    id: "prod-6",
    name: "Filigree Kada Bangles (Pair)",
    sku: "RJ-BG-006",
    category: "bangles",
    price: 12000,
    discountPrice: 9999,
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80"
    ],
    description: "Handcrafted Kada bangles featuring classical screw-open locks and detailed gold filigree mesh work. Plated in high quality 24k gold leaf polish.",
    specifications: "Size: 2.6 (Fits 2.4 to 2.8), Plating: 24k Gold Leaf Electroplated",
    warranty: "1 Year Polish Guarantee.",
    isNew: false,
    isBestSeller: true,
    isSoldOut: false
  }
];

// Helper to initialize local storage mock data
const initLocalStorage = () => {
  if (!localStorage.getItem("rj_products")) {
    localStorage.setItem("rj_products", JSON.stringify(DEFAULT_PRODUCTS));
  }
  if (!localStorage.getItem("rj_categories")) {
    localStorage.setItem("rj_categories", JSON.stringify(DEFAULT_CATEGORIES));
  }
  if (!localStorage.getItem("rj_banners")) {
    localStorage.setItem("rj_banners", JSON.stringify(DEFAULT_BANNERS));
  }
  if (!localStorage.getItem("rj_offers")) {
    localStorage.setItem("rj_offers", JSON.stringify(DEFAULT_OFFERS));
  }
  if (!localStorage.getItem("rj_admin")) {
    localStorage.setItem("rj_admin", JSON.stringify({ email: "admin@ruthika.com", password: "admin" }));
  }
};

initLocalStorage();

// -------------------------------------------------------------
// DATABASE WRAPPER FUNCTIONS (Firestore / LocalStorage)
// -------------------------------------------------------------

// Products API
export const dbGetProducts = async () => {
  if (isFirebaseEnabled) {
    try {
      const querySnapshot = await getDocs(collection(firestoreDb, "products"));
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ id: doc.id, ...doc.data() });
      });
      
      // Auto-seed default products if empty
      if (list.length === 0) {
        console.log("Auto-seeding default products to Firestore...");
        for (const prod of DEFAULT_PRODUCTS) {
          await setDoc(doc(firestoreDb, "products", prod.id), prod);
          list.push(prod);
        }
      }
      return list;
    } catch (e) {
      console.error("Firestore read error, using fallback:", e);
    }
  }
  return JSON.parse(localStorage.getItem("rj_products"));
};

export const dbSaveProduct = async (product) => {
  const finalProduct = {
    ...product,
    price: Number(product.price) || 0,
    discountPrice: Number(product.discountPrice) || 0,
    images: Array.isArray(product.images) ? product.images : [product.images]
  };

  if (isFirebaseEnabled) {
    try {
      const docRef = doc(firestoreDb, "products", finalProduct.id);
      await setDoc(docRef, finalProduct);
      return finalProduct;
    } catch (e) {
      console.error("Firestore save error:", e);
    }
  }

  const list = JSON.parse(localStorage.getItem("rj_products")) || [];
  const idx = list.findIndex(p => p.id === finalProduct.id);
  if (idx > -1) {
    list[idx] = finalProduct;
  } else {
    list.push(finalProduct);
  }
  localStorage.setItem("rj_products", JSON.stringify(list));
  return finalProduct;
};

export const dbDeleteProduct = async (id) => {
  if (isFirebaseEnabled) {
    try {
      await deleteDoc(doc(firestoreDb, "products", id));
      return true;
    } catch (e) {
      console.error("Firestore delete error:", e);
    }
  }

  let list = JSON.parse(localStorage.getItem("rj_products")) || [];
  list = list.filter(p => p.id !== id);
  localStorage.setItem("rj_products", JSON.stringify(list));
  return true;
};

// Categories API
export const dbGetCategories = async () => {
  if (isFirebaseEnabled) {
    try {
      const snapshot = await getDocs(collection(firestoreDb, "categories"));
      const list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      
      // Auto-seed default categories if empty
      if (list.length === 0) {
        console.log("Auto-seeding default categories to Firestore...");
        for (const cat of DEFAULT_CATEGORIES) {
          await setDoc(doc(firestoreDb, "categories", cat.id), cat);
          list.push(cat);
        }
      }
      return list;
    } catch (e) {
      console.error("Firestore read error:", e);
    }
  }
  return JSON.parse(localStorage.getItem("rj_categories"));
};

export const dbSaveCategory = async (category) => {
  if (isFirebaseEnabled) {
    try {
      await setDoc(doc(firestoreDb, "categories", category.id), category);
      return category;
    } catch (e) {
      console.error("Firestore save error:", e);
    }
  }

  const list = JSON.parse(localStorage.getItem("rj_categories")) || [];
  const idx = list.findIndex(c => c.id === category.id);
  if (idx > -1) {
    list[idx] = category;
  } else {
    list.push(category);
  }
  localStorage.setItem("rj_categories", JSON.stringify(list));
  return category;
};

export const dbDeleteCategory = async (id) => {
  if (isFirebaseEnabled) {
    try {
      await deleteDoc(doc(firestoreDb, "categories", id));
      return true;
    } catch (e) {
      console.error("Firestore delete error:", e);
    }
  }

  let list = JSON.parse(localStorage.getItem("rj_categories")) || [];
  list = list.filter(c => c.id !== id);
  localStorage.setItem("rj_categories", JSON.stringify(list));
  return true;
};

// Banners API
export const dbGetBanners = async () => {
  if (isFirebaseEnabled) {
    try {
      const snapshot = await getDocs(collection(firestoreDb, "banners"));
      const list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      
      // Auto-seed default banners if empty
      if (list.length === 0) {
        console.log("Auto-seeding default banners to Firestore...");
        for (const b of DEFAULT_BANNERS) {
          await setDoc(doc(firestoreDb, "banners", b.id), b);
          list.push(b);
        }
      }
      return list;
    } catch (e) {
      console.error("Firestore read error:", e);
    }
  }
  return JSON.parse(localStorage.getItem("rj_banners"));
};

export const dbSaveBanner = async (banner) => {
  if (isFirebaseEnabled) {
    try {
      await setDoc(doc(firestoreDb, "banners", banner.id), banner);
      return banner;
    } catch (e) {
      console.error("Firestore save error:", e);
    }
  }

  const list = JSON.parse(localStorage.getItem("rj_banners")) || [];
  const idx = list.findIndex(b => b.id === banner.id);
  if (idx > -1) {
    list[idx] = banner;
  } else {
    list.push(banner);
  }
  localStorage.setItem("rj_banners", JSON.stringify(list));
  return banner;
};

export const dbDeleteBanner = async (id) => {
  if (isFirebaseEnabled) {
    try {
      await deleteDoc(doc(firestoreDb, "banners", id));
      return true;
    } catch (e) {
      console.error("Firestore delete error:", e);
    }
  }

  let list = JSON.parse(localStorage.getItem("rj_banners")) || [];
  list = list.filter(b => b.id !== id);
  localStorage.setItem("rj_banners", JSON.stringify(list));
  return true;
};

// Offers API
export const dbGetOffers = async () => {
  if (isFirebaseEnabled) {
    try {
      const snapshot = await getDocs(collection(firestoreDb, "offers"));
      const list = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      return list;
    } catch (e) {
      console.error("Firestore read error:", e);
    }
  }
  return JSON.parse(localStorage.getItem("rj_offers"));
};

export const dbSaveOffer = async (offer) => {
  if (isFirebaseEnabled) {
    try {
      await setDoc(doc(firestoreDb, "offers", offer.id), offer);
      return offer;
    } catch (e) {
      console.error("Firestore save error:", e);
    }
  }

  const list = JSON.parse(localStorage.getItem("rj_offers")) || [];
  const idx = list.findIndex(o => o.id === offer.id);
  if (idx > -1) {
    list[idx] = offer;
  } else {
    list.push(offer);
  }
  localStorage.setItem("rj_offers", JSON.stringify(list));
  return offer;
};

export const dbDeleteOffer = async (id) => {
  if (isFirebaseEnabled) {
    try {
      await deleteDoc(doc(firestoreDb, "offers", id));
      return true;
    } catch (e) {
      console.error("Firestore delete error:", e);
    }
  }

  let list = JSON.parse(localStorage.getItem("rj_offers")) || [];
  list = list.filter(o => o.id !== id);
  localStorage.setItem("rj_offers", JSON.stringify(list));
  return true;
};

// -------------------------------------------------------------
// AUTHENTICATION WRAPPER FUNCTIONS (Firestore / LocalStorage)
// -------------------------------------------------------------

export const authLogin = async (email, password) => {
  if (isFirebaseEnabled) {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return { uid: userCredential.user.uid, email: userCredential.user.email };
    } catch (e) {
      console.error("Firebase authentication error:", e);
      throw new Error("Invalid admin credentials.");
    }
  }

  // Local storage auth mock
  const adminData = JSON.parse(localStorage.getItem("rj_admin"));
  if (adminData.email === email && adminData.password === password) {
    const user = { uid: "local-admin-uid", email: adminData.email };
    sessionStorage.setItem("rj_session", JSON.stringify(user));
    return user;
  } else {
    throw new Error("Invalid admin credentials.");
  }
};

export const authLogout = async () => {
  if (isFirebaseEnabled) {
    await signOut(firebaseAuth);
    return true;
  }
  sessionStorage.removeItem("rj_session");
  return true;
};

export const authCheckSession = (callback) => {
  if (isFirebaseEnabled) {
    return onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        callback({ uid: user.uid, email: user.email });
      } else {
        callback(null);
      }
    });
  }

  // Local storage session mock
  const session = sessionStorage.getItem("rj_session");
  if (session) {
    callback(JSON.parse(session));
  } else {
    callback(null);
  }
  // Return dummy unsubscribe function for local session
  return () => {};
};

// Helper to compress images to under 100KB using Canvas (bypasses Firebase Storage subscription)
const compressImageFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        const MAX_DIM = 900;
        
        if (width > MAX_DIM || height > MAX_DIM) {
          if (width > height) {
            height = Math.round((height * MAX_DIM) / width);
            width = MAX_DIM;
          } else {
            width = Math.round((width * MAX_DIM) / height);
            height = MAX_DIM;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to compressed web JPEG (70% quality)
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.onerror = () => {
        resolve(e.target.result); // Fallback to raw base64
      };
      img.src = e.target.result;
    };
    reader.onerror = () => {
      resolve("");
    };
    reader.readAsDataURL(file);
  });
};

// Unified File Upload Client (Firebase Storage vs Base64 Fallback)
export const dbUploadFile = async (file) => {
  if (isFirebaseEnabled && firebaseStorage) {
    try {
      const fileRef = ref(firebaseStorage, `products/${Date.now()}_${file.name}`);
      const snapshot = await uploadBytes(fileRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return downloadUrl;
    } catch (e) {
      console.warn("Firebase Storage requires billing setup. Falling back to compressed base64:", e);
    }
  }

  // Fallback to compressed base64
  return compressImageFile(file);
};
