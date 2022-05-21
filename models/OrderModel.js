import mongoose from "mongoose";

const ShippingSchema = {
  address: {
    type: String,
    required: [true, "Adres bilgisi gerekli"],
  },
  city: {
    type: String,
    required: [true, "Şehir bilgisi gerekli"],
  },
  postalCode: {
    type: String,
    required: [true, "Posta kodu bilgisi gerekli"],
  },
  country: {
    type: String,
    required: [true, "Ülke bilgisi gerekli"],
  },
};

const PaymentSchema = {
  paymentMethod: {
    type: String,
    required: [true, "Ödeme metedo gerekli"],
  },
};

const orderItemSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, "Ürün adı gerekli"],
  },
  qty: {
    type: Number,
    required: [true, "Ürün miktarı gerekli"],
  },
  productImage: {
    type: String,
    required: [true, "Ürün fotorafı gerekli"],
  },
  price: {
    type: Number,
    required: [true, "Ürün fiyatı gerekli"],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
});

const OrderSchema = new mongoose.Schema({
  orderItems: [orderItemSchema],
  shipping: ShippingSchema,
  payment: PaymentSchema,
  itemsPrice: {
    type: Number,
    required: [true, "Ürün fiyatı gerekli"],
  },
  taxPrice: {
    type: Number,
    required: [true, "Vergi fiyatı gerekli"],
  },
  shippingPrice: {
    type: Number,
    required: [true, "Gönderme ücreti gerekli"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Toplam fiyat gerekli"],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: {
    type: Date,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  paymentResult: {
    id: { type: String },
    status: { type: String },
    update_time: { type: String },
    email_address: { type: String },
  },
  deliveredAt: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;
