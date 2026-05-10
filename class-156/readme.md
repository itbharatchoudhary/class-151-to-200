### cross-Site Scripting (XSS) (Attacker)
-> XSS yaani Cross-Site Scripting ek aisa chakkar hai jisme ek hacker apna malicious script (jaise JavaScript) kisi website ke andar chhupa deta hai.  Jab aap us website ko kholte hain, toh browser sochta hai ki yeh code asli hai, aur chala deta hai. Isse hacker aapke data churane lagta hai

### Helmet (preventer)
- ek Node.js library hai jo web applications ko security headers set karke Cross-Site Scripting (XSS) jaise attacks se bachati hai

### clickjacking (Attacker)
- Clickjacking ek security attack hai jahan ek hacker user ko trick karta hai taaki woh bina jaane kisi button ya link par click kar de. Isme website par ek invisible layer (usually <iframe>) laga di jati hai jo bilkul asli content jaisa dikhti hai, lekin peeche kuch aur kaam karti hai.

### Cross-Origin Embedder Policy (COEP)
- ek web security header hai jo ye control karta hai ki ek webpage kaise dusre websites (cross-origin) se resources (jaise images, scripts, stylesheets) load kar sakti hai

### Cross-Origin Data Theft
- (Cross-Origin Data Breach) ka matlab hai jab ek malicious (kharab) website aapke browser ya dusri website se bina permission ke aapka sensitive data chura leti hai.

### Rogue Feature Access
- Rogue Feature Access ka matlab hai jab koi malicious website ya script, aapke browser ke powerful features (jaise camera, microphone, notifications, ya sensors) ko bina sahi permission ya legitimate wajah ke use karta hai. Ye tab hota hai jab koi website aapko dhoka dekar (phishing) permissions maangti hai, ya phir browser ke security loopholes ka fayda utha kar hidden tarike se these features access karti hai.

### why use innerText and not use innerHTML (Frontend prevention) 
- innerText (ya textContent) safe hai kyunki ye text ko hi treat karta hai, jabki innerHTML unsafe ho sakta hai kyunki ye code (HTML/JavaScript) ko execute kar deta hai. Agar aap user se aaya hua data (jaise comments, names, posts) directly innerHTML ke zariye page par dikhayenge, toh hacker aapki site par XSS (Cross-Site Scripting) attack kar sakta hai.

### Data sanitization (Backend prevention)
Data Sanitization ka matlab hai user se aaye huye data ko "safai" karna ya safe banakar process karna, taaki wo aapke system, database, ya browser ke liye khatarnak na ho.

### SSL Stripping / MITM
SSL Stripping (jise SSL Downgrade Attack bhi kehte hain) ek Man-in-the-Middle (MITM) attack ka ek khatarnak tarika hai. Isme hacker aapke browser aur server ke beech ka secure (HTTPS) connection todta hai aur use unsecure (HTTP) connection par downgrade kar deta hai.
Isse hacker aapka saara data (passwords, credit card details, chats) plain text mein padh aur modify kar sakta hai.