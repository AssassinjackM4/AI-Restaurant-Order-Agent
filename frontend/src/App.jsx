import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Check,
  ChefHat,
  ChevronDown,
  Clock3,
  Heart,
  Leaf,
  Minus,
  Plus,
  Search,
  Send,
  ShoppingBag,
  Sparkles,
  Utensils,
  X,
} from "lucide-react";

const PRODUCTS = [
  {
    id: "red sauce penne pasta",
    name: "Red sauce penne pasta",
    category: "Italian",
    price: 17,
    rating: "4.9",
    time: "20–25 min",
    description: "Penne tossed in slow-simmered tomato sauce with fresh basil.",
    image: "photo-1788599760197-81e54ec9c36a",
    tag: "Kitchen favorite",
  },
  {
    id: "veg burger",
    name: "Veg burger",
    category: "American",
    price: 14,
    rating: "4.8",
    time: "15–20 min",
    description: "Crispy garden patty, ripe tomato & tangy house sauce.",
    image: "photo-1520072959219-c595dc870360",
    tag: "Plant-powered",
  },
  {
    id: "veg biryani",
    name: "Veg biryani",
    category: "Indian",
    price: 16,
    rating: "4.9",
    time: "25–30 min",
    description: "Fragrant dum-cooked basmati, garden vegetables & herbs.",
    image: "photo-1697155406055-2db32d47ca07",
    tag: "Chef's pick",
  },
  {
    id: "dosa",
    name: "Masala dosa",
    category: "Indian",
    price: 12,
    rating: "4.7",
    time: "15–20 min",
    description: "Golden-crisp dosa with potato masala & chutneys.",
    image: "photo-1668236543090-82eba5ee5976",
    tag: "Vegetarian",
  },
  {
    id: "pasta",
    name: "Creamy truffle pasta",
    category: "Italian",
    price: 17,
    rating: "4.8",
    time: "20–25 min",
    description: "Silky parmesan cream, mushrooms & a touch of truffle.",
    image: "photo-1473093295043-cdd812d0e601",
    tag: "Sold out",
  },
  {
    id: "white sauce penne pasta",
    name: "White sauce penne pasta",
    category: "Italian",
    price: 17,
    rating: "4.8",
    time: "20–25 min",
    description: "Penne in a silky parmesan cream sauce with cracked pepper.",
    image: "photo-1570549986390-6bd150ac3515",
    tag: "Creamy comfort",
  },
  {
    id: "sushi",
    name: "Salmon sushi set",
    category: "Japanese",
    price: 21,
    rating: "4.9",
    time: "20–25 min",
    description: "Hand-rolled salmon maki with ginger & wasabi.",
    image: "photo-1579871494447-9811cf80d66c",
    tag: "Made to order",
  },
  {
    id: "ramen",
    name: "Miso butter ramen",
    category: "Japanese",
    price: 19,
    rating: "4.8",
    time: "25–30 min",
    description: "Slow-simmered broth, springy noodles & jammy egg.",
    image: "photo-1569718212165-3a8278d5f624",
    tag: "Comfort food",
  },
  {
    id: "butter chicken",
    name: "Butter chicken",
    category: "Indian",
    price: 18,
    rating: "4.9",
    time: "25–30 min",
    description: "Tandoor-kissed chicken in a velvety tomato sauce.",
    image: "photo-1603894584373-5ac82b2ae398",
    tag: "Popular",
  },
  {
    id: "pad thai",
    name: "Bangkok pad thai",
    category: "Thai",
    price: 16,
    rating: "4.7",
    time: "20–25 min",
    description: "Tamarind noodles, roasted peanuts & a squeeze of lime.",
    image: "photo-1559314809-0d155014e29e",
    tag: "Sweet & savory",
  },
  {
    id: "falafel",
    name: "Green garden falafel",
    category: "Mediterranean",
    price: 13,
    rating: "4.7",
    time: "15–20 min",
    description: "Herby falafel, crisp greens & whipped tahini.",
    image: "photo-1512621776951-a57141f2eefd",
    tag: "Plant based",
  },
  {
    id: "cheesecake",
    name: "Vanilla bean cheesecake",
    category: "Dessert",
    price: 9,
    rating: "4.9",
    time: "Ready now",
    description: "Slow-baked, cloud-light cheesecake with berry compote.",
    image: "photo-1533134242443-d4fd215305ad",
    tag: "Save room",
  },
];

const CATEGORIES = ["All dishes", "Italian", "Indian", "American", "Japanese", "Thai", "Mediterranean", "Dessert"];
const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const apiUrl = (path) => `${API_BASE_URL}${path}`;
const MAX_HERO_SLIDES = 5;
const HERO_SLIDES = [
  {
    image: "photo-1517248135467-4c7edcad34c4",
    title: "Chef's feast",
    accent: "Fresh picks from the kitchen",
  },
  {
    image: "photo-1547592180-85f173990554",
    title: "Artisan pasta",
    accent: "Slow-simmered comfort",
  },
  {
    image: "photo-1481931098730-318b6f776db0",
    title: "Noodle bowl",
    accent: "Hot, savory & slurp-worthy",
  },
  {
  image: "photo-1788599760377-fb4008792b0a",
  title: "Cheesy penne arrabbiata",
  accent: "Spicy tomato sauce, basil & grated cheese",
  },
  {
    image: "photo-1682264788192-9abdec90c425",
    title: "Tomato & parsley pizza",
    accent: "Tangy red sauce, fresh herbs",
  },
  {
    image: "photo-1705484804594-223195a4cce4",
    title: "Gourmet burger",
    accent: "Juicy, smoky & stacked",
  },
].slice(0, MAX_HERO_SLIDES);
const imageUrl = (id, width = 700, quality = 85) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`;
const currency = (amount) => `$${amount.toFixed(2)}`;

function RobotAvatar({ className = "" }) {
  return (
    <span className={`human-robot-avatar ${className}`} aria-hidden="true">
      <span className="robot-antenna" />
      <span className="robot-head">
        <span className="robot-ear left" />
        <span className="robot-ear right" />
        <span className="robot-eye left" />
        <span className="robot-eye right" />
        <span className="robot-cheek left" />
        <span className="robot-cheek right" />
        <span className="robot-smile" />
      </span>
      <span className="robot-neck" />
      <span className="robot-arm left"><span className="robot-hand" /></span>
      <span className="robot-arm right"><span className="robot-hand" /></span>
      <span className="robot-body">
        <span className="robot-panel" />
      </span>
      <span className="robot-leg left"><span className="robot-foot" /></span>
      <span className="robot-leg right"><span className="robot-foot" /></span>
    </span>
  );
}

function App() {
  const [stock, setStock] = useState({});
  const [apiReady, setApiReady] = useState(false);
  const [cart, setCart] = useState({});
  const [category, setCategory] = useState("All dishes");
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [activeOrder, setActiveOrder] = useState("");
  const [chatSession, setChatSession] = useState(null);
  const [reply, setReply] = useState("");
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [serviceError, setServiceError] = useState("");
  const [orderNotice, setOrderNotice] = useState("");
  const [favorites, setFavorites] = useState({});
  const [chatOpen, setChatOpen] = useState(true);
  const [heroIndex, setHeroIndex] = useState(0);
  const [displayedHeroIndex, setDisplayedHeroIndex] = useState(0);
  const [displayedHeroImage, setDisplayedHeroImage] = useState(() => imageUrl(HERO_SLIDES[0].image, 1000, 75));
  const searchRef = useRef(null);
  const orderChatBodyRef = useRef(null);
  const floatingChatBodyRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let retryTimer;

    async function connectToKitchen() {
      const controller = new AbortController();
      const timeout = window.setTimeout(() => controller.abort(), 5000);
      try {
        const [menuResponse, healthResponse] = await Promise.all([
          fetch(apiUrl("/api/menu"), { signal: controller.signal }),
          fetch(apiUrl("/api/health"), { signal: controller.signal }),
        ]);
        if (!menuResponse.ok || !healthResponse.ok) {
          throw new Error("The ordering service is starting up.");
        }
        const menuData = await menuResponse.json();
        if (cancelled) return;
        setStock(menuData.items);
        setApiReady(true);
        setServiceError("");
      } catch {
        if (cancelled) return;
        setServiceError("Can't reach the ordering service. Reconnecting automatically…");
        retryTimer = window.setTimeout(connectToKitchen, 3000);
      } finally {
        window.clearTimeout(timeout);
      }
    }

    connectToKitchen();
    return () => {
      cancelled = true;
      window.clearTimeout(retryTimer);
    };
  }, []);

  useEffect(() => {
    const heroSlider = window.setTimeout(() => {
      setHeroIndex((previous) => (previous + 1) % HERO_SLIDES.length);
    }, 2200);
    return () => window.clearTimeout(heroSlider);
  }, [heroIndex]);

  useEffect(() => {
    let cancelled = false;
    const nextImageUrl = imageUrl(HERO_SLIDES[heroIndex].image, 1000, 75);
    const nextImage = new Image();
    nextImage.onload = () => {
      if (!cancelled) {
        setDisplayedHeroImage(nextImageUrl);
        setDisplayedHeroIndex(heroIndex);
      }
    };
    nextImage.onerror = () => {
      if (!cancelled) console.error(`Failed to load hero slide image: ${nextImageUrl}`);
    };
    nextImage.src = nextImageUrl;
    return () => {
      cancelled = true;
    };
  }, [heroIndex]);

  useEffect(() => {
    function focusSearch(event) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    window.addEventListener("keydown", focusSearch);
    return () => window.removeEventListener("keydown", focusSearch);
  }, []);

  const visibleProducts = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = category === "All dishes" || product.category === category;
      const matchesSearch = !needle || `${product.name} ${product.description} ${product.category}`.toLowerCase().includes(needle);
      return matchesCategory && matchesSearch;
    });
  }, [category, search]);

  const cartItems = PRODUCTS.filter((product) => cart[product.id] > 0);
  const itemCount = cartItems.reduce((sum, item) => sum + cart[item.id], 0);
  const subtotal = cartItems.reduce((sum, item) => sum + cart[item.id] * item.price, 0);
  const currentOrder = orders.find((order) => order.session_id === activeOrder);
  const chatOrder = currentOrder?.state.status === "awaiting_user" ? currentOrder : chatSession || currentOrder || orders[0];
  const displayedHeroSlide = HERO_SLIDES[displayedHeroIndex];

  useEffect(() => {
    if (orders.length && activeOrder) document.getElementById("order-chat")?.scrollIntoView({ behavior: "smooth", block: "center" });
    const orderMessages = orderChatBodyRef.current;
    if (orderMessages) orderMessages.scrollTo({ top: orderMessages.scrollHeight, behavior: "smooth" });
    const floatingMessages = floatingChatBodyRef.current;
    if (floatingMessages) floatingMessages.scrollTo({ top: floatingMessages.scrollHeight, behavior: "smooth" });
  }, [apiReady, orders.length, activeOrder, currentOrder?.state.messages.length, chatOrder?.session_id, chatOrder?.state.messages.length]);

  function updateQuantity(id, delta) {
    setCart((previous) => {
      const nextQuantity = Math.max(0, (previous[id] || 0) + delta);
      const next = { ...previous };
      if (nextQuantity === 0) delete next[id];
      else next[id] = nextQuantity;
      return next;
    });
  }

  async function checkout() {
    if (!cartItems.length || loadingCheckout) return;
    setError("");
    setOrderNotice("");
    setLoadingCheckout(true);
    try {
      const response = await fetch(apiUrl("/api/checkout"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems.map((item) => ({ dish_name: item.id, quantity: cart[item.id] })),
        }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.detail || "We couldn't start your order. Please try again.");
      if (!Array.isArray(payload.orders) || payload.orders.length === 0) {
        throw new Error("The ordering service returned no order updates. Your bag is unchanged; please try again.");
      }
      const newOrders = payload.orders.map((order) => ({
        ...order,
        product: PRODUCTS.find((product) => product.id === order.dish_name),
      }));
      setOrders((previous) => [...newOrders, ...previous]);
      setActiveOrder(newOrders[0]?.session_id || "");
      const everyOrderComplete = newOrders.every((order) => order.state.status === "done");
      const anyOrderFailed = newOrders.some((order) => order.state.status === "failed");
      const needsCustomerReply = newOrders.some((order) => order.state.status === "awaiting_user");
      setOrderNotice(
        everyOrderComplete
          ? "Order confirmed and completed by the Craveful AI Agent."
          : anyOrderFailed
            ? "The agent could not complete one or more items. See Kitchen updates for details."
            : needsCustomerReply
              ? "Order request received. Confirm available quantities in Kitchen updates to proceed."
              : "Order submitted to the Craveful AI Agent. Follow its kitchen updates below.",
      );
      setCart({});
    } catch (checkoutError) {
      setError(checkoutError.message || "The ordering service couldn't be reached. Your bag is unchanged; please try again.");
    } finally {
      setLoadingCheckout(false);
    }
  }

  async function sendReply(message) {
    if (!message.trim() || sending) return;
    setSending(true);
    setError("");
    try {
      let target = currentOrder?.state.status === "awaiting_user" ? currentOrder : chatSession;
      if (!target || ["done", "failed"].includes(target.state.status)) {
        const sessionResponse = await fetch(apiUrl("/api/chat/sessions"), { method: "POST" });
        const sessionPayload = await sessionResponse.json().catch(() => ({}));
        if (!sessionResponse.ok) throw new Error(sessionPayload.detail || "The assistant couldn't start a chat session.");
        target = sessionPayload;
      }
      const response = await fetch(apiUrl(`/api/sessions/${target.session_id}/messages`), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim() }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(payload.detail || "Your reply couldn't be sent.");
      if (orders.some((order) => order.session_id === target.session_id)) {
        setOrders((previous) =>
          previous.map((order) => (order.session_id === target.session_id ? { ...order, state: payload.state } : order)),
        );
      } else {
        setChatSession({ session_id: target.session_id, state: payload.state });
      }
      setReply("");
    } catch (replyError) {
      setError(replyError.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen overflow-hidden">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Craveful AI Agent home">
          <span className="brand-mark"><Utensils size={19} strokeWidth={2.3} /></span>
          <span>Craveful AI Agent</span>
        </a>
        <nav className="top-nav" aria-label="Main navigation">
          <a href="#menu">Menu</a>
          <a href="#story">Our story</a>
          <button className="order-help-link" onClick={() => setChatOpen(true)}>Order help</button>
        </nav>
        <a className="cart-nav" href="#your-order" aria-label={`Your bag, ${itemCount} items`}>
          <ShoppingBag size={18} />
          <span>Bag</span>
          <span className="cart-count">{itemCount}</span>
        </a>
      </header>

      <main>
        <section className="hero-wrap">
          <div className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><Sparkles size={14} /> GOOD FOOD, GOOD MOOD</div>
              <h1>A little joy,<br />on your <span>plate.</span></h1>
              <p>Thoughtful ingredients, big-hearted cooking, and the kind of food that makes your day.</p>
              <a className="primary-button hero-button" href="#menu">Explore the menu <ArrowDown size={17} /></a>
              <div className="hero-social">
                <div className="avatar-stack">
                  <img src={imageUrl("photo-1534528741775-53994a69daeb", 80)} alt="" />
                  <img src={imageUrl("photo-1500648767791-00dcc994a43e", 80)} alt="" />
                  <img src={imageUrl("photo-1531123897727-8f129e1688ce", 80)} alt="" />
                </div>
                <span><strong>4.9/5</strong> from 2,000+ happy bites</span>
              </div>
            </div>
            <div className="hero-image-wrap">
              <div
                className="hero-image"
                style={{ backgroundImage: `url("${displayedHeroImage}")` }}
                role="img"
                aria-label={displayedHeroSlide.title}
              />
              <div className="hero-slide-badge">
                <span>{displayedHeroSlide.title}</span>
                <small>{displayedHeroSlide.accent}</small>
              </div>
              <div className="hero-slide-dots" aria-label="Hero slides">
                {HERO_SLIDES.map((slide, index) => (
                  <button
                    key={slide.title}
                    className={index === heroIndex ? "dot active" : "dot"}
                    onClick={() => setHeroIndex(index)}
                    aria-label={`Show ${slide.title}`}
                  />
                ))}
              </div>
              <div className="floating-note note-top"><span className="note-icon"><Leaf size={16} /></span><span><strong>Fresh, always</strong><small>Good ingredients only</small></span></div>
              <div className="floating-note note-bottom"><span className="note-icon note-clock"><Clock3 size={17} /></span><span><strong>At your door</strong><small>In about 25 minutes</small></span></div>
              <div className="hero-stamp"><span>MADE WITH<br />A LITTLE<br /><b>LOVE</b></span><Sparkles size={15} /></div>
            </div>
            <div className="hero-squiggle" aria-hidden="true">✳</div>
          </div>
        </section>

        <section className="promise-row" id="story">
          <div><span className="promise-icon"><Leaf size={18} /></span><span><strong>Fresh from the kitchen</strong><small>Made when you order</small></span></div>
          <div><span className="promise-icon"><ChefHat size={19} /></span><span><strong>Made with care</strong><small>Recipes worth sharing</small></span></div>
          <div><span className="promise-icon"><Clock3 size={18} /></span><span><strong>Quick, not rushed</strong><small>Delivered with a smile</small></span></div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-dot" /> THE GOOD STUFF</div>
              <h2>Find your <span>favorite.</span></h2>
              <p>A few kitchen favorites, made fresh just for you.</p>
            </div>
            <label className="search-box">
              <Search size={18} />
              <input ref={searchRef} value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the menu" aria-label="Search menu" />
              <kbd>⌘ K</kbd>
            </label>
          </div>

          <div className="category-row" role="tablist" aria-label="Menu categories">
            {CATEGORIES.map((name) => (
              <button
                className={`category-pill ${category === name ? "selected" : ""}`}
                key={name}
                onClick={() => setCategory(name)}
                role="tab"
                aria-selected={category === name}
              >
                {name}
              </button>
            ))}
          </div>

          {!apiReady && <div className="service-note"><span className="loader-dot" />{serviceError || "Connecting to the kitchen…"}</div>}
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const quantity = cart[product.id] || 0;
              const available = stock[product.id] ?? 0;
              const soldOut = apiReady && available === 0;
              return (
                <article className="food-card" key={product.id}>
                  <div className="food-photo-wrap">
                    <img
                      className="food-photo"
                      src={imageUrl(product.image)}
                      alt={product.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = imageUrl("photo-1547592180-85f173990554");
                      }}
                    />
                    <span className={`food-tag ${soldOut ? "sold-tag" : ""}`}><span />{!apiReady ? "Checking stock" : soldOut ? "Just sold out" : product.tag}</span>
                    <button
                      className={`favorite-button ${favorites[product.id] ? "favorite-active" : ""}`}
                      onClick={() => setFavorites((previous) => ({ ...previous, [product.id]: !previous[product.id] }))}
                      aria-label={favorites[product.id] ? `Remove ${product.name} from favorites` : `Add ${product.name} to favorites`}
                      aria-pressed={Boolean(favorites[product.id])}
                    >
                      <Heart size={15} fill={favorites[product.id] ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <div className="food-info">
                    <div className="food-title-row"><h3>{product.name}</h3><span className="rating">★ {product.rating}</span></div>
                    <p>{product.description}</p>
                    <div className="food-meta"><span><Clock3 size={14} /> {product.time}</span><span>{product.category}</span></div>
                    <div className="food-buy-row">
                      <strong className="price">{currency(product.price)}</strong>
                      {quantity ? (
                        <div className="quantity-control" aria-label={`${quantity} in bag`}>
                          <button onClick={() => updateQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}><Minus size={15} /></button>
                          <span>{quantity}</span>
                          <button onClick={() => updateQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}><Plus size={15} /></button>
                        </div>
                      ) : (
                        <button
                          className="add-button"
                          onClick={() => updateQuantity(product.id, 1)}
                          disabled={!apiReady || soldOut}
                          aria-label={soldOut ? `${product.name} is sold out` : !apiReady ? "Ordering is unavailable while the kitchen reconnects" : `Add ${product.name} to bag`}
                        >
                          <Plus size={16} /> Add
                        </button>
                      )}
                      <a className="quick-cart-button" href="#your-order" aria-label="Go to your bag">
                        <ShoppingBag size={15} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
            {visibleProducts.length === 0 && <div className="empty-search"><Search size={25} /><strong>No dishes found</strong><span>Try another search or cuisine.</span></div>}
          </div>
        </section>

        <section className="checkout-section" id="your-order">
          <div className="checkout-copy">
            <span className="eyebrow"><Sparkles size={14} /> YOUR TABLE IS WAITING</span>
            <h2>Good things<br />are <span>in the bag.</span></h2>
            <p>Choose a few favorites and let our kitchen take it from here.</p>
            <div className="checkout-reassurance"><Check size={16} /> No account needed <span /> Secure checkout</div>
          </div>
          <div className="cart-panel">
            <div className="cart-panel-heading"><span><ShoppingBag size={19} /> Your bag</span><span className="cart-count light-count">{itemCount}</span></div>
            {error && <div className="error-banner" role="alert"><span>{error}</span><button onClick={() => setError("")} aria-label="Dismiss error"><X size={16} /></button></div>}
            {cartItems.length === 0 ? (
              <div className="empty-cart"><span className="empty-cart-icon"><ShoppingBag size={23} /></span><strong>Your bag is taking a little nap.</strong><span>Add something delicious to wake it up.</span><a href="#menu">Browse the menu <ArrowRight size={15} /></a></div>
            ) : (
              <>
                <div className="cart-lines">
                  {cartItems.map((item) => (
                    <div className="cart-line" key={item.id}>
                      <img src={imageUrl(item.image, 140)} alt="" />
                      <div className="cart-line-info"><strong>{item.name}</strong><small>{currency(item.price)} each</small><div className="mini-quantity"><button onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}><Minus size={12} /></button><span>{cart[item.id]}</span><button onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}><Plus size={12} /></button></div></div>
                      <strong className="line-price">{currency(item.price * cart[item.id])}</strong>
                    </div>
                  ))}
                </div>
                <div className="subtotal-row"><span>Subtotal</span><strong>{currency(subtotal)}</strong></div>
                <p className="delivery-note"><span /> Delivery & final total confirmed with the restaurant</p>
                {!apiReady && <p className="service-hint"><span className="loader-dot" />{serviceError || "Connecting to the kitchen…"} Your bag is saved while we reconnect.</p>}
                <button className="primary-button checkout-button" disabled={loadingCheckout || !apiReady} onClick={checkout}>
                  {loadingCheckout ? <><span className="button-spinner" /> Sending to the kitchen</> : <>Confirm order <ArrowRight size={17} /></>}
                </button>
              </>
            )}
            {orderNotice && <div className="checkout-confirmation" role="status"><Check size={16} />{orderNotice}</div>}
            <div className="secure-note"><Check size={14} /> A real person is preparing your order.</div>
          </div>
        </section>

        {orders.length > 0 && (
          <section className="order-section" id="order-chat">
            <div className="order-heading">
              <div><div className="eyebrow"><Bot size={15} /> YOUR ORDER, IN GOOD HANDS</div><h2>Kitchen <span>updates.</span></h2></div>
              <span className="live-badge"><span /> LIVE ORDER CHAT</span>
            </div>
            <div className="order-workspace">
              <div className="order-tabs">
                {orders.map((order) => (
                  <button className={`order-tab ${activeOrder === order.session_id ? "active" : ""}`} key={order.session_id} onClick={() => setActiveOrder(order.session_id)}>
                    <span className="order-tab-image" style={{ backgroundImage: `url("${imageUrl(order.product?.image || "photo-1547592180-85f173990554", 100)}")` }} />
                    <span className="order-tab-text"><strong>{order.product?.name || order.dish_name}</strong><small>{order.state.status === "done" ? "Complete" : order.state.status === "failed" ? "Order ended" : "In progress"}</small></span>
                    {order.state.status === "done" ? <Check size={16} className="tab-check" /> : <ChevronDown size={16} />}
                  </button>
                ))}
              </div>
              {currentOrder && (
                <div className="chat-card">
                  <div className="chat-topline"><div className="chat-agent"><span><Bot size={18} /></span><div><strong>Craveful AI Agent</strong><small><span /> Here to help with your order</small></div></div><span className="chat-step">{currentOrder.state.status === "done" ? "All set" : currentOrder.state.status === "failed" ? "Session complete" : "Order support"}</span></div>
                  <div className="chat-messages" aria-live="polite" ref={orderChatBodyRef}>
                    {currentOrder.state.messages.map((message, index) => (
                      <div className={`chat-message ${message.role === "user" ? "user-message" : ""}`} key={`${currentOrder.session_id}-${index}`}>
                        {message.role === "assistant" && <span className="message-avatar"><Bot size={15} /></span>}
                        <p>{message.content}</p>
                      </div>
                    ))}
                  </div>
                  {currentOrder.state.status === "awaiting_user" && (
                    <>
                      {currentOrder.state.order.available_quantity > 0 && (
                        <button className="accept-button" onClick={() => sendReply("Yes, please send the available quantity.")} disabled={sending}>
                          <Check size={16} /> Accept {currentOrder.state.order.available_quantity} available
                        </button>
                      )}
                      <form className="chat-composer" onSubmit={(event) => { event.preventDefault(); sendReply(reply); }}>
                        <input value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Reply or order something else…" aria-label="Reply to the order assistant" />
                        <button type="submit" disabled={sending || !reply.trim()} aria-label="Send message">{sending ? <span className="button-spinner" /> : <Send size={17} />}</button>
                      </form>
                    </>
                  )}
                  {currentOrder.state.status === "done" && <div className="chat-finished"><Check size={16} /> Order complete — enjoy every bite!</div>}
                  {currentOrder.state.status === "failed" && <div className="chat-finished failed-finished"><X size={16} /> This order session has ended. You can start a fresh order from the menu.</div>}
                </div>
              )}
            </div>
          </section>
        )}

        <section className="closing-note">
          <span>✳</span>
          <p>Good food tastes even better when it’s made with a little <em>heart.</em></p>
          <a href="#menu">Back to the menu <ArrowDown size={15} /></a>
        </section>
      </main>

      <div className="ai-chat-launcher">
        <button className="ai-bot-button" onClick={() => setChatOpen((open) => !open)} aria-label="Toggle AI restaurant assistant">
          <RobotAvatar className="launcher-robot" />
          <span>AI Chef Bot</span>
        </button>
        {chatOpen && (
          <div className="ai-chat-window" role="dialog" aria-label="AI restaurant assistant">
            <div className="ai-chat-header">
              <div>
                <span className="ai-header-identity">
                  <RobotAvatar className="header-robot" />
                  <span><strong>Craveful AI Chef Bot</strong><small>Live kitchen status</small></span>
                </span>
              </div>
              <button className="close-chat" onClick={() => setChatOpen(false)} aria-label="Close AI chat">
                <X size={15} />
              </button>
            </div>
            <div className="ai-chat-body" aria-live="polite" ref={floatingChatBodyRef}>
              <div className="ai-chat-message assistant">
                <span>AI Chef Bot</span>
                <p>
                  Hi there! I’m your AI Chef Bot. I can check what’s in stock and help you order.
                  {apiReady
                    ? ` Today's menu availability: ${Object.entries(stock)
                        .map(([dish, quantity]) => `${dish}: ${quantity}${quantity === 0 ? " (sold out)" : ""}`)
                        .join("; ")}.`
                    : " I’m checking the latest restaurant stock now…"}
                </p>
              </div>
              {chatOrder?.state.messages.length ? chatOrder.state.messages.map((message, index) => (
                <div className={`ai-chat-message ${message.role === "user" ? "user" : "assistant"}`} key={`${chatOrder.session_id}-${index}`}>
                  <span>{message.role === "assistant" ? "AI" : "You"}</span>
                  <p>{message.content}</p>
                </div>
              )) : (
                <div className="ai-chat-message assistant">
                  <span>AI Chef Bot</span>
                  <p>What would you like to enjoy? Ask about any listed dish or tell me a dish and quantity to order.</p>
                </div>
              )}
            </div>
            {chatOrder?.state.pending_partial_confirmation && chatOrder.state.order.available_quantity > 0 && (
              <button className="accept-button compact" onClick={() => sendReply("Yes, please send the available quantity.")} disabled={sending}>
                <Check size={15} /> Accept {chatOrder.state.order.available_quantity}
              </button>
            )}
            {error && <div className="ai-chat-error" role="alert">{error}</div>}
            <form className="ai-chat-form" onSubmit={(event) => { event.preventDefault(); sendReply(reply); }}>
              <input
                value={reply}
                onChange={(event) => setReply(event.target.value)}
                placeholder="Ask about stock or order…"
                aria-label="Chat with AI assistant"
              />
              <button type="submit" disabled={sending || !reply.trim()} aria-label="Send chat message">
                {sending ? <span className="button-spinner" /> : <Send size={15} />}
              </button>
            </form>
          </div>
        )}
      </div>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark"><Utensils size={17} /></span><span>Craveful AI Agent</span></a>
        <span>Made for good days & good appetites.</span>
        <span className={`api-status ${apiReady ? "online" : ""}`}><span /> {apiReady ? "Kitchen connected" : "Connecting to kitchen"}</span>
      </footer>
    </div>
  );
}

export default App;
