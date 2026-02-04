
interface TradeData {
  e: string; // Event type
  E: number; // Event time
  s: string; // Symbol (BTCUSDT)
  p: string; // Price (String olarak gelir)
  q: string; // Quantity
}

const url = "wss://stream.binance.com:9443/ws/btcusdt@trade";

console.log("--- Bun & TypeScript Başlatıldı ---");
console.log( "bağlanılıyor...");
const socket = new WebSocket(url);

socket.addEventListener("open", () => {
  console.log(" Bağlantı başarılı! Veriler akıyor...");
});

socket.addEventListener("message", (event) => {
  try {
    
    const data = JSON.parse(event.data.toString()) as TradeData;
    
    const price = parseFloat(data.p).toFixed(2);
    
    console.log(`BTC Fiyatı: $${price}`);
  } catch (error) {
    console.error("Veri işleme hatası:", error);
  }
});

socket.addEventListener("close", () => {
  console.log(" Bağlantı koptu.");
});