import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ShoppingBag, Layers, Image as ImageIcon, Tag, LogOut, 
  Plus, Edit2, Trash2, X, Check, AlertCircle 
} from "lucide-react";
import { 
  authCheckSession, authLogout,
  dbGetProducts, dbSaveProduct, dbDeleteProduct,
  dbGetCategories, dbSaveCategory, dbDeleteCategory,
  dbGetBanners, dbSaveBanner, dbDeleteBanner,
  dbGetOffers, dbSaveOffer, dbDeleteOffer,
  dbUploadFile
} from "../firebase";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState(null);
  const [activeTab, setActiveTab] = useState("products");
  const [loading, setLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  // Data States
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [offers, setOffers] = useState([]);

  // Dynamic Dashboard Category Management
  const [selectedAdminCategory, setSelectedAdminCategory] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  // Modals States
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null); // null means adding new
  const [discountInputMode, setDiscountInputMode] = useState("percentage"); // "percentage" or "price"



  const [showBannerModal, setShowBannerModal] = useState(false);
  const [newBanner, setNewBanner] = useState({ id: "", title: "", subtitle: "", imageUrl: "", link: "" });

  const [showOfferModal, setShowOfferModal] = useState(false);
  const [newOffer, setNewOffer] = useState({ id: "", title: "", description: "", code: "", discount: "" });

  // Auth Guard Session checking
  useEffect(() => {
    const unsubscribe = authCheckSession((user) => {
      if (!user) {
        navigate("/admin/login");
      } else {
        setAdminUser(user);
        loadAllDashboardData();
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const loadAllDashboardData = async () => {
    setLoading(true);
    try {
      const [pList, cList, bList, oList] = await Promise.all([
        dbGetProducts(),
        dbGetCategories(),
        dbGetBanners(),
        dbGetOffers()
      ]);
      setProducts(pList || []);
      setCategories(cList || []);
      setBanners(bList || []);
      setOffers(oList || []);
      
      if (cList && cList.length > 0) {
        setSelectedAdminCategory((prev) => prev || cList[0].id);
      }
    } catch (e) {
      console.error("Error loading dashboard databases:", e);
    } finally {
      setLoading(false);
    }
  };

  const triggerNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 4000);
  };

  // -------------------------------------------------------------
  // PRODUCTS CRUD HANDLERS
  // -------------------------------------------------------------
  const handleOpenAddProduct = () => {
    setCurrentProduct({
      id: "prod-" + Date.now(),
      name: "",
      sku: "RJ-" + Math.floor(100 + Math.random() * 900),
      category: selectedAdminCategory || (categories[0]?.id || ""),
      price: "",
      discountPrice: "",
      discountPercent: "",
      images: [],
      description: "",
      specifications: "",
      warranty: "",
      isNew: true,
      isBestSeller: false,
      isSoldOut: false
    });
    setShowProductModal(true);
  };

  const handleOpenEditProduct = (prod) => {
    let pct = "";
    if (prod.price && prod.discountPrice) {
      pct = Math.round(((prod.price - prod.discountPrice) / prod.price) * 100);
    }
    setCurrentProduct({ ...prod, discountPercent: pct });
    setDiscountInputMode(prod.discountPrice ? "price" : "percentage");
    setShowProductModal(true);
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!currentProduct.name || !currentProduct.price) return;
    
    // Clean up empty image strings
    const cleanImages = currentProduct.images.filter(img => img.trim() !== "");
    const updatedProd = {
      ...currentProduct,
      images: cleanImages.length > 0 ? cleanImages : ["https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=300&q=80"]
    };

    // Clean up temporary local fields before saving
    const { discountPercent, ...productData } = updatedProd;

    await dbSaveProduct(productData);
    triggerNotification(`Product "${updatedProd.name}" saved successfully.`);
    setShowProductModal(false);
    setCurrentProduct(null);
    loadAllDashboardData();
  };

  const handleDeleteProduct = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      await dbDeleteProduct(id);
      triggerNotification(`Product "${name}" deleted.`);
      loadAllDashboardData();
    }
  };

  const handleToggleSoldOut = async (prod) => {
    const updated = { ...prod, isSoldOut: !prod.isSoldOut };
    await dbSaveProduct(updated);
    triggerNotification(`Updated availability for "${prod.name}".`);
    loadAllDashboardData();
  };

  // URL Input helper state for product modal
  const [urlInputText, setUrlInputText] = useState("");

  const handleImageFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    for (const file of files) {
      try {
        const fileUrl = await dbUploadFile(file);
        setCurrentProduct(prev => {
          const cleanImages = (prev.images || []).filter(img => img.trim() !== "");
          return {
            ...prev,
            images: [...cleanImages, fileUrl]
          };
        });
      } catch (err) {
        console.error("Error uploading image file:", err);
      }
    }
  };

  const handleRemoveImageIndex = (indexToRemove) => {
    setCurrentProduct(prev => ({
      ...prev,
      images: (prev.images || []).filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleAddUrlInput = () => {
    if (!urlInputText.trim()) return;
    setCurrentProduct(prev => {
      const cleanImages = (prev.images || []).filter(img => img.trim() !== "");
      return {
        ...prev,
        images: [...cleanImages, urlInputText.trim()]
      };
    });
    setUrlInputText("");
  };

  // -------------------------------------------------------------
  // CATEGORIES CRUD HANDLERS
  // -------------------------------------------------------------
  const handleAddCategoryDirect = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    const catId = newCategoryName.trim().toLowerCase().replace(/[^a-z0-9]/g, "-");
    const catObj = { id: catId, name: newCategoryName.trim() };
    await dbSaveCategory(catObj);
    triggerNotification(`Category "${catObj.name}" created successfully.`);
    setNewCategoryName("");
    await loadAllDashboardData();
    setSelectedAdminCategory(catId);
  };

  const handleDeleteCategoryDirect = async (catId, catName) => {
    if (window.confirm(`Are you sure you want to delete the category "${catName}"? This will not delete the designs under it.`)) {
      await dbDeleteCategory(catId);
      triggerNotification(`Category "${catName}" deleted.`);
      await loadAllDashboardData();
      setSelectedAdminCategory((prev) => {
        if (prev === catId) {
          const remaining = categories.find(c => c.id !== catId);
          return remaining ? remaining.id : "";
        }
        return prev;
      });
    }
  };

  const handleRenameCategoryDirect = async (catId, oldName) => {
    const newName = window.prompt(`Rename category "${oldName}" to:`, oldName);
    if (newName === null) return;
    const trimmed = newName.trim();
    if (!trimmed) {
      alert("Category name cannot be empty.");
      return;
    }
    await dbSaveCategory({ id: catId, name: trimmed });
    triggerNotification(`Category renamed to "${trimmed}" successfully.`);
    await loadAllDashboardData();
  };

  // -------------------------------------------------------------
  // BANNERS CRUD HANDLERS
  // -------------------------------------------------------------
  const handleBannerSubmit = async (e) => {
    e.preventDefault();
    if (!newBanner.title || !newBanner.imageUrl) return;
    const banner = {
      ...newBanner,
      id: newBanner.id || "banner-" + Date.now()
    };
    await dbSaveBanner(banner);
    triggerNotification(`Banner "${banner.title}" saved.`);
    setNewBanner({ id: "", title: "", subtitle: "", imageUrl: "", link: "" });
    setShowBannerModal(false);
    loadAllDashboardData();
  };

  const handleDeleteBanner = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete banner "${title}"?`)) {
      await dbDeleteBanner(id);
      triggerNotification(`Banner "${title}" deleted.`);
      loadAllDashboardData();
    }
  };

  // -------------------------------------------------------------
  // OFFERS CRUD HANDLERS
  // -------------------------------------------------------------
  const handleOfferSubmit = async (e) => {
    e.preventDefault();
    if (!newOffer.title || !newOffer.discount) return;
    const offer = {
      ...newOffer,
      id: newOffer.id || "offer-" + Date.now()
    };
    await dbSaveOffer(offer);
    triggerNotification(`Offer "${offer.title}" saved.`);
    setNewOffer({ id: "", title: "", description: "", code: "", discount: "" });
    setShowOfferModal(false);
    loadAllDashboardData();
  };

  const handleDeleteOffer = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete offer "${title}"?`)) {
      await dbDeleteOffer(id);
      triggerNotification(`Offer "${title}" deleted.`);
      loadAllDashboardData();
    }
  };

  // -------------------------------------------------------------
  // LOGOUT HANDLER
  // -------------------------------------------------------------
  const handleLogoutClick = async () => {
    await authLogout();
    navigate("/admin/login");
  };

  if (loading || !adminUser) {
    return (
      <div className="flex-center" style={{ minHeight: "65vh", flexDirection: "column", gap: "20px" }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--color-border)", borderTopColor: "var(--color-gold)", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
        <p style={{ fontStyle: "italic", color: "var(--color-text-muted)" }}>Loading Secure Workspace...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard-page section-padding" style={{ minHeight: "85vh" }}>
      <div className="container">
        
        {/* Banner success notification */}
        {successMsg && (
          <div className="toast-container">
            <div className="toast animate-fade-in">
              <Check size={18} style={{ color: "var(--color-gold)" }} />
              <span>{successMsg}</span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", borderBottom: "1px solid var(--color-border)", paddingBottom: "15px" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-display)", color: "var(--color-maroon-dark)", fontSize: "2.2rem" }}>Ruthika Admin Panel</h1>
            <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)", fontWeight: "600" }}>Signed in as: {adminUser.email}</span>
          </div>
          <button className="btn btn-secondary" onClick={handleLogoutClick} style={{ padding: "8px 16px", fontSize: "0.8rem" }}>
            <LogOut size={14} /> Logout
          </button>
        </div>

        <div className="dashboard-layout">
          
          {/* Left panel tabs sidebar */}
          <aside className="dashboard-sidebar">
            <button 
              className={`dashboard-tab-btn ${activeTab === "products" ? "active" : ""}`}
              onClick={() => setActiveTab("products")}
            >
              <ShoppingBag size={18} /> Products
            </button>
            <button 
              className={`dashboard-tab-btn ${activeTab === "banners" ? "active" : ""}`}
              onClick={() => setActiveTab("banners")}
            >
              <ImageIcon size={18} /> Banners ({banners.length})
            </button>
            <button 
              className={`dashboard-tab-btn ${activeTab === "offers" ? "active" : ""}`}
              onClick={() => setActiveTab("offers")}
            >
              <Tag size={18} /> Offers ({offers.length})
            </button>
          </aside>

          {/* Right panel content display area */}
          <main className="dashboard-content">

            {/* PRODUCTS TAB */}
            {activeTab === "products" && (
              <div className="admin-split-layout">
                
                {/* Left Sidebar Panel - Categories Management */}
                <div className="admin-sidebar-panel">
                  <h3 className="admin-panel-title">Categories</h3>
                  
                  {/* Quick Add Category Form */}
                  <form onSubmit={handleAddCategoryDirect} className="admin-quick-add-form">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Add category name..." 
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      required
                    />
                    <button type="submit" className="btn btn-primary btn-sm btn-full" style={{ marginTop: "10px" }}>
                      <Plus size={14} /> Add Category
                    </button>
                  </form>
                  
                  {/* Categories Navigation List */}
                  <ul className="admin-category-list">
                    {categories.map((cat) => (
                      <li 
                        key={cat.id} 
                        className={`admin-category-item ${selectedAdminCategory === cat.id ? "active" : ""}`}
                        onClick={() => setSelectedAdminCategory(cat.id)}
                      >
                        <span className="admin-category-name">{cat.name}</span>
                        <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
                          <button 
                            type="button" 
                            className="admin-category-edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRenameCategoryDirect(cat.id, cat.name);
                            }}
                            title="Rename Category"
                            style={{ 
                              background: "none", 
                              border: "none", 
                              color: "var(--color-gold)", 
                              cursor: "pointer", 
                              padding: "4px",
                              display: "flex",
                              alignItems: "center",
                              transition: "color 0.2s"
                            }}
                          >
                            <Edit2 size={12} />
                          </button>
                          <button 
                            type="button" 
                            className="admin-category-del-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteCategoryDirect(cat.id, cat.name);
                            }}
                            title="Delete Category"
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right Main Panel - Category Products list */}
                <div className="admin-main-panel">
                  {selectedAdminCategory ? (
                    (() => {
                      const activeCatObj = categories.find(c => c.id === selectedAdminCategory);
                      const catProducts = products.filter(p => p.category === selectedAdminCategory);
                      
                      return (
                        <div>
                          <div className="dashboard-header-row">
                            <div>
                              <h2 className="dashboard-tab-title" style={{ margin: 0 }}>
                                Designs in "{activeCatObj ? activeCatObj.name : selectedAdminCategory}"
                              </h2>
                              <span style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
                                {catProducts.length} items registered
                              </span>
                            </div>
                            <button className="btn btn-primary" onClick={handleOpenAddProduct}>
                              <Plus size={16} /> Add Design
                            </button>
                          </div>

                          {catProducts.length > 0 ? (
                            <table className="admin-table">
                              <thead>
                                <tr>
                                  <th style={{ width: "70px" }}>Image</th>
                                  <th>Design Details</th>
                                  <th>SKU</th>
                                  <th>Price</th>
                                  <th style={{ width: "100px" }}>Status</th>
                                  <th style={{ width: "100px" }}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {catProducts.map((prod) => (
                                  <tr key={prod.id}>
                                    <td>
                                      <img 
                                        src={prod.images && prod.images[0] ? prod.images[0] : ""} 
                                        alt={prod.name} 
                                        className="admin-thumbnail" 
                                      />
                                    </td>
                                    <td>
                                      <div style={{ fontWeight: "700", color: "var(--color-maroon-dark)" }}>{prod.name}</div>
                                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                                        {prod.isNew && <span style={{ color: "var(--color-success)", marginRight: "8px" }}>New</span>}
                                        {prod.isBestSeller && <span style={{ color: "var(--color-gold-dull)" }}>BestSeller</span>}
                                      </div>
                                    </td>
                                    <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{prod.sku}</td>
                                    <td>
                                      {prod.discountPrice ? (
                                        <div>
                                          <div style={{ fontWeight: "700", color: "var(--color-error)" }}>₹{prod.discountPrice.toLocaleString("en-IN")}</div>
                                          <div style={{ textDecoration: "line-through", color: "var(--color-text-muted)", fontSize: "0.75rem" }}>₹{prod.price.toLocaleString("en-IN")}</div>
                                        </div>
                                      ) : (
                                        <div style={{ fontWeight: "700" }}>₹{prod.price.toLocaleString("en-IN")}</div>
                                      )}
                                    </td>
                                    <td>
                                      <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "0.8rem", fontWeight: "600" }}>
                                        <input 
                                          type="checkbox" 
                                          checked={prod.isSoldOut}
                                          onChange={() => handleToggleSoldOut(prod)}
                                        />
                                        <span style={{ color: prod.isSoldOut ? "var(--color-error)" : "var(--color-success)" }}>
                                          {prod.isSoldOut ? "Sold Out" : "Available"}
                                        </span>
                                      </label>
                                    </td>
                                    <td>
                                      <div className="action-buttons-cell">
                                        <button 
                                          className="btn-icon btn-edit" 
                                          onClick={() => handleOpenEditProduct(prod)}
                                          title="Edit product"
                                          aria-label="Edit product"
                                        >
                                          <Edit2 size={14} />
                                        </button>
                                        <button 
                                          className="btn-icon btn-delete" 
                                          onClick={() => handleDeleteProduct(prod.id, prod.name)}
                                          title="Delete product"
                                          aria-label="Delete product"
                                        >
                                          <Trash2 size={14} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          ) : (
                            <div style={{ textAlign: "center", padding: "50px 0", color: "var(--color-text-muted)" }}>
                              <p>No designs registered in this category yet.</p>
                              <button className="btn btn-secondary btn-sm" onClick={handleOpenAddProduct} style={{ marginTop: "10px" }}>
                                Add First Design
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()
                  ) : (
                    <div style={{ textAlign: "center", padding: "80px 0", color: "var(--color-text-muted)" }}>
                      <Layers size={48} style={{ color: "var(--color-border)", marginBottom: "15px" }} />
                      <p style={{ fontWeight: "600" }}>No Categories Configured</p>
                      <p style={{ fontSize: "0.9rem" }}>Please add a category in the left panel to begin managing designs.</p>
                    </div>
                  )}
                </div>

              </div>
            )}

            {/* BANNERS TAB */}
            {activeTab === "banners" && (
              <div>
                <div className="dashboard-header-row">
                  <h2 className="dashboard-tab-title">Home Hero Banners</h2>
                  <button className="btn btn-primary" onClick={() => setShowBannerModal(true)}>
                    <Plus size={16} /> Add Banner Slide
                  </button>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: "100px" }}>Preview</th>
                      <th>Title & Description</th>
                      <th>Destination Link</th>
                      <th style={{ width: "100px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {banners.map((b) => (
                      <tr key={b.id}>
                        <td>
                          <img src={b.imageUrl} alt={b.title} className="admin-thumbnail" style={{ width: "80px", height: "45px" }} />
                        </td>
                        <td>
                          <div style={{ fontWeight: "700" }}>{b.title}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{b.subtitle}</div>
                        </td>
                        <td style={{ fontSize: "0.8rem", fontFamily: "monospace" }}>{b.link}</td>
                        <td>
                          <button 
                            className="btn-icon btn-delete" 
                            onClick={() => handleDeleteBanner(b.id, b.title)}
                            title="Delete banner"
                            aria-label="Delete banner"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* OFFERS TAB */}
            {activeTab === "offers" && (
              <div>
                <div className="dashboard-header-row">
                  <h2 className="dashboard-tab-title">Promo Offers & Alerts</h2>
                  <button className="btn btn-primary" onClick={() => setShowOfferModal(true)}>
                    <Plus size={16} /> Add Promo Offer
                  </button>
                </div>

                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Discount Tag</th>
                      <th>Offer Title</th>
                      <th>Promo Code</th>
                      <th style={{ width: "100px" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((o) => (
                      <tr key={o.id}>
                        <td style={{ color: "var(--color-maroon-light)", fontWeight: "700" }}>{o.discount}</td>
                        <td>
                          <div style={{ fontWeight: "700" }}>{o.title}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>{o.description}</div>
                        </td>
                        <td style={{ fontFamily: "monospace" }}>{o.code || "None"}</td>
                        <td>
                          <button 
                            className="btn-icon btn-delete" 
                            onClick={() => handleDeleteOffer(o.id, o.title)}
                            title="Delete offer"
                            aria-label="Delete offer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* -------------------------------------------------------------
          PRODUCTS EDIT/ADD MODAL
      ------------------------------------------------------------- */}
      {showProductModal && currentProduct && (
        <div className="overlay" onClick={() => setShowProductModal(false)}>
          <div className="modal-card animate-fade-in" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {currentProduct.name ? "Edit Design Details" : "Add New Design"}
              </h3>
              <button className="modal-close" onClick={() => setShowProductModal(false)} aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit}>
              
              <div className="form-group">
                <label className="form-label" htmlFor="prod-name">Product Name *</label>
                <input
                  type="text"
                  id="prod-name"
                  className="form-control"
                  value={currentProduct.name}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-sku">SKU Code *</label>
                  <input
                    type="text"
                    id="prod-sku"
                    className="form-control"
                    value={currentProduct.sku}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, sku: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-category">Product Category *</label>
                  <select
                    id="prod-category"
                    className="form-control"
                    value={currentProduct.category}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-price">Original Price (₹) *</label>
                  <input
                    type="number"
                    id="prod-price"
                    className="form-control"
                    value={currentProduct.price}
                    onChange={(e) => {
                      const val = e.target.value ? Number(e.target.value) : "";
                      let discPrice = currentProduct.discountPrice;
                      if (val && discountInputMode === "percentage" && currentProduct.discountPercent) {
                        discPrice = Math.round(val - (val * currentProduct.discountPercent / 100));
                      } else if (val && discountInputMode === "price" && currentProduct.discountPrice) {
                        const pct = Math.round(((val - currentProduct.discountPrice) / val) * 100);
                        setCurrentProduct({ ...currentProduct, price: val, discountPercent: pct });
                        return;
                      }
                      setCurrentProduct({ 
                        ...currentProduct, 
                        price: val,
                        discountPrice: discPrice
                      });
                    }}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <label className="form-label" style={{ marginBottom: 0 }}>
                      {discountInputMode === "percentage" ? "Discount (%) [Optional]" : "Discounted Price (₹) [Optional]"}
                    </label>
                    <div style={{ display: "flex", border: "1px solid var(--color-gold)", borderRadius: "4px", overflow: "hidden" }}>
                      <button
                        type="button"
                        onClick={() => setDiscountInputMode("percentage")}
                        style={{
                          background: discountInputMode === "percentage" ? "var(--color-gold)" : "none",
                          color: discountInputMode === "percentage" ? "var(--color-maroon-dark)" : "var(--color-gold)",
                          border: "none",
                          padding: "2px 8px",
                          fontSize: "0.7rem",
                          fontWeight: "700",
                          cursor: "pointer"
                        }}
                      >
                        %
                      </button>
                      <button
                        type="button"
                        onClick={() => setDiscountInputMode("price")}
                        style={{
                          background: discountInputMode === "price" ? "var(--color-gold)" : "none",
                          color: discountInputMode === "price" ? "var(--color-maroon-dark)" : "var(--color-gold)",
                          border: "none",
                          padding: "2px 8px",
                          fontSize: "0.7rem",
                          fontWeight: "700",
                          cursor: "pointer"
                        }}
                      >
                        ₹
                      </button>
                    </div>
                  </div>

                  {discountInputMode === "percentage" ? (
                    <div>
                      <input
                        type="number"
                        id="prod-discount-percent"
                        className="form-control"
                        placeholder="e.g. 10"
                        value={currentProduct.discountPercent || ""}
                        onChange={(e) => {
                          const pct = e.target.value ? Number(e.target.value) : "";
                          let discPrice = "";
                          if (currentProduct.price && pct !== "") {
                            discPrice = Math.round(currentProduct.price - (currentProduct.price * pct / 100));
                          }
                          setCurrentProduct({ 
                            ...currentProduct, 
                            discountPercent: pct,
                            discountPrice: discPrice
                          });
                        }}
                      />
                      {currentProduct.discountPrice ? (
                        <div style={{ fontSize: "0.75rem", color: "var(--color-gold)", marginTop: "4px", fontWeight: "600" }}>
                          Calculated Price: ₹{currentProduct.discountPrice}
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="number"
                        id="prod-discount-price"
                        className="form-control"
                        placeholder="e.g. 900"
                        value={currentProduct.discountPrice || ""}
                        onChange={(e) => {
                          const discVal = e.target.value ? Number(e.target.value) : "";
                          let pct = "";
                          if (currentProduct.price && discVal !== "") {
                            pct = Math.round(((currentProduct.price - discVal) / currentProduct.price) * 100);
                          }
                          setCurrentProduct({ 
                            ...currentProduct, 
                            discountPrice: discVal,
                            discountPercent: pct
                          });
                        }}
                      />
                      {currentProduct.discountPercent !== "" && currentProduct.discountPercent > 0 ? (
                        <div style={{ fontSize: "0.75rem", color: "var(--color-gold)", marginTop: "4px", fontWeight: "600" }}>
                          Calculated Discount: {currentProduct.discountPercent}% Off
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>

              {/* Image Upload & Thumbnails Section */}
              <div className="form-group">
                <label className="form-label" style={{ fontWeight: "700" }}>Design Images</label>
                
                {/* Thumbnails Grid Preview */}
                {currentProduct.images && currentProduct.images.length > 0 ? (
                  <div className="admin-image-preview-grid">
                    {currentProduct.images.map((img, idx) => (
                      <div key={idx} className="admin-image-preview-card">
                        <img src={img} alt={`Preview ${idx + 1}`} />
                        <button 
                          type="button" 
                          className="admin-image-preview-remove" 
                          onClick={() => handleRemoveImageIndex(idx)}
                          title="Remove image"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="admin-image-preview-empty">
                    No images uploaded yet. Select files or add a URL below.
                  </div>
                )}

                {/* Upload Action Panel */}
                <div className="admin-image-actions-panel">
                  {/* File Upload Selector */}
                  <div className="admin-file-upload-wrapper">
                    <label className="admin-file-upload-label">
                      <ImageIcon size={18} />
                      <span>Upload Images (from Mobile Gallery / Laptop Files)</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageFileUpload}
                        style={{ display: "none" }}
                      />
                    </label>
                  </div>

                  {/* Web URL input fallback */}
                  <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                    <input 
                      type="url"
                      className="form-control"
                      placeholder="Or paste web image URL here..."
                      value={urlInputText}
                      onChange={(e) => setUrlInputText(e.target.value)}
                    />
                    <button 
                      type="button" 
                      className="btn btn-secondary"
                      onClick={handleAddUrlInput}
                      style={{ padding: "0 15px", whiteSpace: "nowrap" }}
                    >
                      Add URL
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="prod-desc">Description</label>
                <textarea
                  id="prod-desc"
                  className="form-control"
                  rows="3"
                  value={currentProduct.description}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-specs">Specifications [Optional]</label>
                  <input
                    type="text"
                    id="prod-specs"
                    className="form-control"
                    placeholder="Length: 24 Inches, Weight: 80g"
                    value={currentProduct.specifications}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, specifications: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="prod-warranty">Warranty details [Optional]</label>
                  <input
                    type="text"
                    id="prod-warranty"
                    className="form-control"
                    placeholder="6 Months Polish Warranty"
                    value={currentProduct.warranty}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, warranty: e.target.value })}
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="form-checkbox-row">
                <label className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={currentProduct.isNew}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, isNew: e.target.checked })}
                  />
                  <span>Mark as New Arrival</span>
                </label>

                <label className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={currentProduct.isBestSeller}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, isBestSeller: e.target.checked })}
                  />
                  <span>Mark as Best Seller</span>
                </label>

                <label className="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    checked={currentProduct.isSoldOut}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, isSoldOut: e.target.checked })}
                  />
                  <span style={{ color: "var(--color-error)", fontWeight: "600" }}>Mark as Sold Out</span>
                </label>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Save Design Details
              </button>

            </form>
          </div>
        </div>
      )}



      {/* -------------------------------------------------------------
          BANNERS ADD MODAL
      ------------------------------------------------------------- */}
      {showBannerModal && (
        <div className="overlay" onClick={() => setShowBannerModal(false)}>
          <div className="modal-card animate-fade-in" style={{ maxWidth: "550px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Banner Slide</h3>
              <button className="modal-close" onClick={() => setShowBannerModal(false)} aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleBannerSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="ban-title">Slide Title *</label>
                <input
                  type="text"
                  id="ban-title"
                  className="form-control"
                  placeholder="e.g. Exclusive Kundan Collection"
                  value={newBanner.title}
                  onChange={(e) => setNewBanner({ ...newBanner, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ban-sub">Subtitle Description</label>
                <input
                  type="text"
                  id="ban-sub"
                  className="form-control"
                  placeholder="e.g. Handcrafted gold plated temple sets"
                  value={newBanner.subtitle}
                  onChange={(e) => setNewBanner({ ...newBanner, subtitle: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="ban-url">Banner Image URL *</label>
                <input
                  type="url"
                  id="ban-url"
                  className="form-control"
                  placeholder="https://images.unsplash.com/..."
                  value={newBanner.imageUrl}
                  onChange={(e) => setNewBanner({ ...newBanner, imageUrl: e.target.value })}
                  required
                />
              </div>

              <div className="form-group" style={{ marginBottom: "30px" }}>
                <label className="form-label" htmlFor="ban-link">Destination Filter Link</label>
                <input
                  type="text"
                  id="ban-link"
                  className="form-control"
                  placeholder="e.g. /shop?category=necklaces"
                  value={newBanner.link}
                  onChange={(e) => setNewBanner({ ...newBanner, link: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Save Banner Slide
              </button>
            </form>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          OFFERS ADD MODAL
      ------------------------------------------------------------- */}
      {showOfferModal && (
        <div className="overlay" onClick={() => setShowOfferModal(false)}>
          <div className="modal-card animate-fade-in" style={{ maxWidth: "550px" }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Promo Offer</h3>
              <button className="modal-close" onClick={() => setShowOfferModal(false)} aria-label="Close modal">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleOfferSubmit}>
              <div className="form-group">
                <label className="form-label" htmlFor="off-title">Offer Title *</label>
                <input
                  type="text"
                  id="off-title"
                  className="form-control"
                  placeholder="e.g. Shravanam Month Festival Sale"
                  value={newOffer.title}
                  onChange={(e) => setNewOffer({ ...newOffer, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="off-desc">Offer Description *</label>
                <input
                  type="text"
                  id="off-desc"
                  className="form-control"
                  placeholder="e.g. Complimentry silver coin on orders above ₹15,000"
                  value={newOffer.description}
                  onChange={(e) => setNewOffer({ ...newOffer, description: e.target.value })}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "30px" }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="off-discount">Discount Tag *</label>
                  <input
                    type="text"
                    id="off-discount"
                    className="form-control"
                    placeholder="e.g. Free Gift / 10% Off"
                    value={newOffer.discount}
                    onChange={(e) => setNewOffer({ ...newOffer, discount: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="off-code">Promo Coupon Code</label>
                  <input
                    type="text"
                    id="off-code"
                    className="form-control"
                    placeholder="e.g. SHRAVANAM"
                    value={newOffer.code}
                    onChange={(e) => setNewOffer({ ...newOffer, code: e.target.value })}
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-full">
                Save Offer Details
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
