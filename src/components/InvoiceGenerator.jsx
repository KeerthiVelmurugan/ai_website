
import { useMemo, useState, useEffect } from "react";
import "./InvoiceGenerator.css";

const today = new Date().toLocaleDateString("en-CA");

const initialItem = () => ({
  id: `${Date.now()}-${Math.random()}`,
  description: "",
  quantity: 1,
  price: 0,
});

function InvoiceGenerator() {
  const [logo, setLogo] = useState("");
  const [business, setBusiness] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
  });

  useEffect(() => {
  document.title = "Invoice Generator | Mini Projects";
}, []);

  const [invoiceNo, setInvoiceNo] = useState("INV-001");
  const [invoiceDate, setInvoiceDate] = useState(today);
  const [dueDate, setDueDate] = useState("");
  const [tax, setTax] = useState("18");
  const [discount, setDiscount] = useState("0");
  const [currency, setCurrency] = useState("INR");
  const [items, setItems] = useState([initialItem()]);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const money = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);

  const subtotal = useMemo(
    () =>
      items.reduce(
        (sum, item) =>
          sum +
          Math.max(0, Number(item.quantity) || 0) *
            Math.max(0, Number(item.price) || 0),
        0
      ),
    [items]
  );

  const discountAmount =
    (subtotal * Math.min(100, Math.max(0, Number(discount) || 0))) / 100;

  const taxableAmount = subtotal - discountAmount;
  const taxAmount =
    (taxableAmount * Math.max(0, Number(tax) || 0)) / 100;
  const total = taxableAmount + taxAmount;

  const updateBusiness = (field, value) => {
    setBusiness((prev) => ({ ...prev, [field]: value }));
    setGenerated(false);
  };

  const updateCustomer = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    setGenerated(false);
  };

  const updateItem = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
    setGenerated(false);
  };

  const handleLogo = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setLogo(reader.result);
      setGenerated(false);
      setError("");
    };

    reader.onerror = () => setError("Unable to read the selected image.");
    reader.readAsDataURL(file);
  };

  const generateInvoice = () => {
    setError("");

    if (!business.name.trim()) {
      setError("Please enter your business name.");
      return;
    }

    if (!customer.name.trim()) {
      setError("Please enter the customer name.");
      return;
    }

    if (!invoiceNo.trim()) {
      setError("Please enter an invoice number.");
      return;
    }

    if (dueDate && invoiceDate && dueDate < invoiceDate) {
      setError("The due date cannot be earlier than the invoice date.");
      return;
    }

    if (items.some((item) => !item.description.trim())) {
      setError("Please enter a description for every item.");
      return;
    }

    if (
      items.some(
        (item) =>
          Number(item.quantity) <= 0 ||
          !Number.isFinite(Number(item.quantity)) ||
          Number(item.price) < 0 ||
          !Number.isFinite(Number(item.price))
      )
    ) {
      setError("Enter a valid quantity and a non-negative price.");
      return;
    }

    setGenerated(true);

    setTimeout(() => {
      document
        .getElementById("invoice-preview")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const resetInvoice = () => {
    setLogo("");
    setBusiness({ name: "", email: "", mobile: "", address: "" });
    setCustomer({ name: "", email: "", mobile: "", address: "" });
    setInvoiceNo("INV-001");
    setInvoiceDate(today);
    setDueDate("");
    setTax("18");
    setDiscount("0");
    setCurrency("INR");
    setItems([initialItem()]);
    setGenerated(false);
    setError("");
  };

  return (
    <main className="invoice-app">
      <header className="app-header">
        <div className="brand">
          <div className="brand-icon">✦</div>
          <div>
            <h1>Invoice<span>Craft</span></h1>
            <p>Simple invoicing, beautifully done.</p>
          </div>
        </div>

        <div className="header-label">
          <span className="status-dot" />
          Invoice Workspace
        </div>
      </header>

      <section className="welcome-section">
        <div>
          <p className="eyebrow">BILLING MADE SIMPLE</p>
          <h2>Create your invoice</h2>
          <p className="welcome-text">
            Add your details, list your services, and create a professional invoice.
          </p>
        </div>
        <div className="welcome-icon">▤</div>
      </section>

      <div className="invoice-layout">
        <section className="form-panel">
          <div className="panel-heading">
            <div>
              <h3>Invoice details</h3>
              <p>Fill in the information below.</p>
            </div>
            <span className="step-badge">01</span>
          </div>

          <div className="form-section">
            <h4><span className="section-icon">▣</span> Your business</h4>

            <label className="upload-box">
              {logo ? (
                <img src={logo} alt="Selected company logo" className="upload-logo" />
              ) : (
                <span className="upload-symbol">＋</span>
              )}
              <span>
                <strong>{logo ? "Change your logo" : "Upload your logo"}</strong>
                <small>PNG, JPG or other image · Max 5 MB</small>
              </span>
              <input type="file" accept="image/*" onChange={handleLogo} />
            </label>

            {logo && (
              <button
                type="button"
                className="text-button"
                onClick={() => {
                  setLogo("");
                  setGenerated(false);
                }}
              >
                Remove logo
              </button>
            )}

            <div className="field-grid">
              <div className="field full-width">
                <label>Business name <span>*</span></label>
                <input
                  value={business.name}
                  onChange={(e) => updateBusiness("name", e.target.value)}
                  placeholder="e.g. Keerthi Solutions"
                />
              </div>

              <div className="field">
                <label>Email address</label>
                <input
                  type="email"
                  value={business.email}
                  onChange={(e) => updateBusiness("email", e.target.value)}
                  placeholder="you@company.com"
                />
              </div>

              <div className="field">
                <label>Mobile number</label>
                <input
                  type="tel"
                  value={business.mobile}
                  onChange={(e) => updateBusiness("mobile", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="field full-width">
                <label>Business address</label>
                <textarea
                  rows="2"
                  value={business.address}
                  onChange={(e) => updateBusiness("address", e.target.value)}
                  placeholder="Street, city, state, PIN code"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4><span className="section-icon">♙</span> Bill to</h4>

            <div className="field-grid">
              <div className="field full-width">
                <label>Customer name <span>*</span></label>
                <input
                  value={customer.name}
                  onChange={(e) => updateCustomer("name", e.target.value)}
                  placeholder="Customer or company name"
                />
              </div>

              <div className="field">
                <label>Email address</label>
                <input
                  type="email"
                  value={customer.email}
                  onChange={(e) => updateCustomer("email", e.target.value)}
                  placeholder="customer@email.com"
                />
              </div>

              <div className="field">
                <label>Mobile number</label>
                <input
                  type="tel"
                  value={customer.mobile}
                  onChange={(e) => updateCustomer("mobile", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </div>

              <div className="field full-width">
                <label>Customer address</label>
                <textarea
                  rows="2"
                  value={customer.address}
                  onChange={(e) => updateCustomer("address", e.target.value)}
                  placeholder="Customer billing address"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h4><span className="section-icon">▦</span> Invoice information</h4>

            <div className="field-grid">
              <div className="field full-width">
                <label>Invoice number <span>*</span></label>
                <input
                  value={invoiceNo}
                  onChange={(e) => {
                    setInvoiceNo(e.target.value);
                    setGenerated(false);
                  }}
                  placeholder="INV-001"
                />
              </div>

              <div className="field">
                <label>Invoice date <span>*</span></label>
                <input
                  type="date"
                  value={invoiceDate}
                  onChange={(e) => {
                    setInvoiceDate(e.target.value);
                    setGenerated(false);
                  }}
                />
              </div>

              <div className="field">
                <label>Due date</label>
                <input
                  type="date"
                  min={invoiceDate || undefined}
                  value={dueDate}
                  onChange={(e) => {
                    setDueDate(e.target.value);
                    setGenerated(false);
                  }}
                />
              </div>

              <div className="field full-width">
                <label>Currency</label>
                <select
                  value={currency}
                  onChange={(e) => {
                    setCurrency(e.target.value);
                    setGenerated(false);
                  }}
                >
                  <option value="INR">INR — Indian Rupee (₹)</option>
                  <option value="USD">USD — US Dollar ($)</option>
                  <option value="EUR">EUR — Euro (€)</option>
                  <option value="GBP">GBP — British Pound (£)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-title-row">
              <h4><span className="section-icon">☷</span> Items & services</h4>
              <span className="item-count">{items.length} item(s)</span>
            </div>

            {items.map((item, index) => (
              <div className="item-card" key={item.id}>
                <div className="item-card-heading">
                  <strong>Item {index + 1}</strong>
                  {items.length > 1 && (
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => {
                        setItems((prev) => prev.filter((x) => x.id !== item.id));
                        setGenerated(false);
                      }}
                    >
                      Remove
                    </button>
                  )}
                </div>

                <div className="field">
                  <label>Description <span>*</span></label>
                  <input
                    value={item.description}
                    onChange={(e) =>
                      updateItem(item.id, "description", e.target.value)
                    }
                    placeholder="e.g. Website development"
                  />
                </div>

                <div className="field-grid item-numbers">
                  <div className="field">
                    <label>Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateItem(item.id, "quantity", e.target.value)
                      }
                    />
                  </div>

                  <div className="field">
                    <label>Unit price</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={item.price}
                      onChange={(e) =>
                        updateItem(item.id, "price", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="item-amount">
                  Amount
                  <strong>
                    {money(
                      Math.max(0, Number(item.quantity) || 0) *
                        Math.max(0, Number(item.price) || 0)
                    )}
                  </strong>
                </div>
              </div>
            ))}

            <button
              type="button"
              className="add-item-button"
              onClick={() => {
                setItems((prev) => [...prev, initialItem()]);
                setGenerated(false);
              }}
            >
              ＋ Add another item
            </button>
          </div>

          <div className="form-section">
            <h4><span className="section-icon">％</span> Tax & discount</h4>

            <div className="field-grid">
              <div className="field">
                <label>Tax (%)</label>
                <input
                  type="number"
                  min="0"
                  value={tax}
                  onChange={(e) => {
                    setTax(e.target.value);
                    setGenerated(false);
                  }}
                />
              </div>

              <div className="field">
                <label>Discount (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={discount}
                  onChange={(e) => {
                    setDiscount(e.target.value);
                    setGenerated(false);
                  }}
                />
              </div>
            </div>
            <p className="helper-text">
              Tax is calculated after deducting the discount.
            </p>
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="button" className="reset-button" onClick={resetInvoice}>
              Reset
            </button>
            <button
              type="button"
              className="generate-button"
              onClick={generateInvoice}
            >
              Generate invoice <span>→</span>
            </button>
          </div>
        </section>

        <aside className="summary-panel">
          <div className="summary-heading">
            <div>
              <p className="eyebrow">LIVE SUMMARY</p>
              <h3>Invoice overview</h3>
            </div>
            <div className="summary-icon">₹</div>
          </div>

          <div className="total-card">
            <p>Estimated total</p>
            <h2>{money(total)}</h2>
            <span>Including tax and discount</span>
          </div>

          <div className="summary-breakdown">
            <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <div>
              <span>Discount ({Math.min(100, Math.max(0, Number(discount) || 0))}%)</span>
              <strong className="discount-value">−{money(discountAmount)}</strong>
            </div>
            <div>
              <span>Tax ({Math.max(0, Number(tax) || 0)}%)</span>
              <strong>{money(taxAmount)}</strong>
            </div>
            <div className="summary-final">
              <span>Total due</span><strong>{money(total)}</strong>
            </div>
          </div>

          <div className="summary-details">
            <h4>Invoice details</h4>
            <div><span>Invoice number</span><strong>{invoiceNo || "—"}</strong></div>
            <div><span>Invoice date</span><strong>{invoiceDate || "—"}</strong></div>
            <div><span>Due date</span><strong>{dueDate || "Not set"}</strong></div>
            <div><span>Line items</span><strong>{items.length}</strong></div>
          </div>

          <div className="tip-card">
            <span>✦</span>
            <div>
              <strong>Looking professional</strong>
              <p>Add your logo and contact information to personalize your invoice.</p>
            </div>
          </div>

          <p className="privacy-note">Your entries stay in this page while it remains open.</p>
        </aside>
      </div>

      {generated && (
        <section className="preview-section" id="invoice-preview">
          <div className="preview-toolbar">
            <div>
              <p className="eyebrow">READY TO SHARE</p>
              <h2>Invoice preview</h2>
            </div>
            <button type="button" className="generate-button" onClick={() => window.print()}>
              Print / Save PDF ↗
            </button>
          </div>

          <article className="print-invoice">
            <div className="print-top">
              <div className="print-business">
                {logo && <img src={logo} alt="Business logo" />}
                <h2>{business.name}</h2>
                {business.address && <p>{business.address}</p>}
                {business.email && <p>{business.email}</p>}
                {business.mobile && <p>Mobile: {business.mobile}</p>}
              </div>
              <div className="print-invoice-title">
                <h1>INVOICE</h1>
                <p>{invoiceNo}</p>
                <span className="print-status">INVOICE</span>
              </div>
            </div>

            <div className="print-divider" />

            <div className="print-parties">
              <div>
                <p className="print-label">BILL TO</p>
                <h3>{customer.name}</h3>
                {customer.address && <p>{customer.address}</p>}
                {customer.email && <p>{customer.email}</p>}
                {customer.mobile && <p>Mobile: {customer.mobile}</p>}
              </div>
              <div className="print-dates">
                <div><span>Invoice number</span><strong>{invoiceNo}</strong></div>
                <div><span>Invoice date</span><strong>{invoiceDate}</strong></div>
                <div><span>Due date</span><strong>{dueDate || "Not specified"}</strong></div>
              </div>
            </div>

            <table className="print-table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Qty</th>
                  <th>Unit price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{money(Number(item.price) || 0)}</td>
                    <td>
                      {money(
                        (Number(item.quantity) || 0) * (Number(item.price) || 0)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="print-totals">
              <div><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
              <div><span>Discount ({discount || 0}%)</span><strong>−{money(discountAmount)}</strong></div>
              <div><span>Tax ({tax || 0}%)</span><strong>{money(taxAmount)}</strong></div>
              <div className="print-grand-total"><span>Total due</span><strong>{money(total)}</strong></div>
            </div>

            <div className="print-footer">
              <strong>Thank you for your business!</strong>
              <p>We appreciate your trust and support.</p>
            </div>
          </article>
        </section>
      )}

      <footer className="app-footer">
        <span>InvoiceCraft</span> · Simple invoicing for your business
      </footer>
    </main>
  );
}

export default InvoiceGenerator;
