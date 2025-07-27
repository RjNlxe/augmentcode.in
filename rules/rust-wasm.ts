export const rustWasmRules = [
  {
    title: "Rust WebAssembly Development Augment Rules",
    tags: ["Rust", "WebAssembly", "WASM", "Performance"],
    slug: "rust-webassembly-development-augment-rules",
    libs: ["Rust", "wasm-pack", "wasm-bindgen", "web-sys"],
    content: `
You are an expert in Rust programming, WebAssembly (WASM), and high-performance web applications.

## Rust WebAssembly Fundamentals (2024-2025)

### Project Setup:
\`\`\`toml
# Cargo.toml for WASM project
[package]
name = "my-wasm-project"
version = "0.1.0"
edition = "2021"

[lib]
crate-type = ["cdylib"]

[dependencies]
wasm-bindgen = "0.2"
web-sys = "0.3"
js-sys = "0.3"
console_error_panic_hook = "0.1"
wee_alloc = "0.4"

[dependencies.getrandom]
version = "0.2"
features = ["js"]

[profile.release]
opt-level = "s"
lto = true
\`\`\`

### Core WASM Development:
\`\`\`rust
use wasm_bindgen::prelude::*;
use web_sys::console;

// Import JavaScript functions
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
    
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

// Macro for easier console logging
macro_rules! console_log {
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

// Export Rust functions to JavaScript
#[wasm_bindgen]
pub fn greet(name: &str) {
    alert(&format!("Hello, {}!", name));
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
\`\`\`

### Performance Optimization:
- Use \`opt-level = "s"\` for size optimization
- Enable LTO (Link Time Optimization) for production builds
- Use \`wee_alloc\` as global allocator for smaller binary size
- Minimize string allocations and prefer \`&str\` over \`String\`
- Use \`#[inline]\` for hot path functions
- Profile with \`wasm-pack build --profiling\`

### Memory Management:
\`\`\`rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct ImageProcessor {
    width: u32,
    height: u32,
    data: Vec<u8>,
}

#[wasm_bindgen]
impl ImageProcessor {
    #[wasm_bindgen(constructor)]
    pub fn new(width: u32, height: u32) -> ImageProcessor {
        ImageProcessor {
            width,
            height,
            data: vec![0; (width * height * 4) as usize],
        }
    }
    
    #[wasm_bindgen(getter)]
    pub fn width(&self) -> u32 {
        self.width
    }
    
    #[wasm_bindgen]
    pub fn get_data_ptr(&self) -> *const u8 {
        self.data.as_ptr()
    }
    
    #[wasm_bindgen]
    pub fn process_pixels(&mut self) {
        // High-performance pixel processing
        for pixel in self.data.chunks_exact_mut(4) {
            pixel[0] = pixel[0].saturating_add(10); // Red
            pixel[1] = pixel[1].saturating_add(5);  // Green
            pixel[2] = pixel[2].saturating_add(15); // Blue
        }
    }
}
\`\`\`

### JavaScript Integration:
\`\`\`javascript
// Loading and using WASM module
import init, { greet, ImageProcessor } from './pkg/my_wasm_project.js';

async function run() {
    await init();
    
    // Use exported functions
    greet('WebAssembly');
    
    // Use exported classes
    const processor = new ImageProcessor(800, 600);
    processor.process_pixels();
    
    // Access memory directly for performance
    const dataPtr = processor.get_data_ptr();
    const data = new Uint8Array(
        wasm.memory.buffer,
        dataPtr,
        800 * 600 * 4
    );
}

run();
\`\`\`

### Advanced WASM Features:
\`\`\`rust
use wasm_bindgen::prelude::*;
use wasm_bindgen_futures::JsFuture;
use web_sys::{Request, RequestInit, Response};

#[wasm_bindgen]
pub async fn fetch_data(url: &str) -> Result<String, JsValue> {
    let mut opts = RequestInit::new();
    opts.method("GET");
    
    let request = Request::new_with_str_and_init(url, &opts)?;
    
    let window = web_sys::window().unwrap();
    let resp_value = JsFuture::from(window.fetch_with_request(&request)).await?;
    let resp: Response = resp_value.dyn_into().unwrap();
    
    let text = JsFuture::from(resp.text()?).await?;
    Ok(text.as_string().unwrap())
}
\`\`\`

### Error Handling:
\`\`\`rust
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn set_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub fn divide(a: f64, b: f64) -> Result<f64, String> {
    if b == 0.0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}
\`\`\`

### Build and Deployment:
\`\`\`bash
# Build for development
wasm-pack build --target web --dev

# Build for production
wasm-pack build --target web --release

# Build for Node.js
wasm-pack build --target nodejs

# Build for bundlers
wasm-pack build --target bundler
\`\`\`

### Testing WASM Code:
\`\`\`rust
#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;
    
    wasm_bindgen_test_configure!(run_in_browser);
    
    #[wasm_bindgen_test]
    fn test_add() {
        assert_eq!(add(2, 3), 5);
    }
    
    #[wasm_bindgen_test]
    async fn test_async_function() {
        let result = fetch_data("https://api.example.com/data").await;
        assert!(result.is_ok());
    }
}
\`\`\`

### Performance Patterns:
- Use SIMD instructions for parallel processing
- Implement custom allocators for specific use cases
- Use unsafe code judiciously for performance-critical sections
- Minimize JavaScript/WASM boundary crossings
- Use typed arrays for efficient data transfer
- Implement object pooling for frequently allocated objects

### Framework Integration:
- Use with React for performance-critical components
- Integrate with Vue.js for computational heavy lifting
- Use with Svelte for optimal bundle size
- Implement with Web Workers for non-blocking execution
- Use with Canvas API for graphics processing

### Best Practices:
- Keep WASM modules focused and single-purpose
- Use feature flags to reduce binary size
- Implement proper error handling and recovery
- Use Rust's type system to prevent runtime errors
- Profile and benchmark performance regularly
- Use cargo-audit for security vulnerability scanning
- Implement comprehensive testing for both Rust and JavaScript sides
- Use semantic versioning for WASM module releases

### Common Use Cases:
- Image and video processing
- Cryptographic operations
- Mathematical computations
- Game engines and physics simulations
- Audio processing and synthesis
- Data compression and decompression
- Machine learning inference
- Real-time data visualization

Always prioritize performance, safety, and maintainability when developing Rust WebAssembly applications.
`,
  },
];
