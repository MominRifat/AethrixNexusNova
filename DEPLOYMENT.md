# Aethrix Nexus Nova - Vercel Deployment & Git-Sync Guide

## 1. Vercel-এ ডিপ্লয় করার সহজ ধাপ (100% Free)

1. [vercel.com](https://vercel.com)-এ যান এবং আপনার GitHub অ্যাকাউন্ট (`Siam-2004`) দিয়ে লগইন করুন।
2. **Add New...** > **Project**-এ ক্লিক করুন।
3. GitHub রিপোজিটরি তালিকা থেকে **`AethrixNexusNova`** সিলেক্ট করে **Import** বাটনে ক্লিক করুন।
4. **Environment Variables** সেকশনে নিচের ভেরিয়েবলগুলো যোগ করুন:
   - `EMAIL_HOST` = `smtp.gmail.com`
   - `EMAIL_PORT` = `587`
   - `EMAIL_HOST_USER` = `mominrifat8@gmail.com`
   - `EMAIL_HOST_PASSWORD` = `brgrrqybbnjolahl`
   - `ADMIN_NOTIFICATION_EMAIL` = `mominrifat8@gmail.com`
   *(ঐচ্ছিক: ভবিষ্যতে Gemini AI কী ব্যবহার করতে চাইলে `GEMINI_API_KEY` যোগ করতে পারেন)*
5. **Deploy** বাটনে ক্লিক করুন।
   - ৩০-৪০ সেকেন্ডের মধ্যে আপনার প্রজেক্ট লাইভ হয়ে যাবে এবং Vercel একটি ফ্রি `.vercel.app` ডোমেন (যেমন `aethrix-nexus-nova.vercel.app`) দেবে।

---

## 2. ডাটাবেস ও ফ্রেন্ডের সাথে কোলাবোরেশন সিস্টেম (Portfolio-Style Git Datastore)

Neon বা Supabase-এর মতো ক্লাউড ডাটাবেস ফ্রি টিয়ারে কিছু দিন পর পজ (pause/inactivity sleep) হয়ে যায় এবং সাইট ডাউন দেখায়। তাই আপনার পোর্টফোলিও স্টাইলে **Git-Backed Local Datastore** ব্যবহার করা হয়েছে:

### যেভাবে কাজ করবে:
1. **সব ডেটা ও কন্টেন্ট গিটহাবে সংরক্ষিত:**
   - কেস স্টাডি, টেক স্ট্যাক, এস্টিমেটর রেটস, লোকেশন ও টিম মেম্বারদের সব ডাটা `src/lib/` ফোল্ডারের ফাইলগুলোতে সরাসরি স্ট্রাকচার্ড ডাটাবেস হিসেবে থাকে।
2. **ফ্রেন্ডের সাথে সিংক (Collaboration):**
   - আপনার ফ্রেন্ড তার পিসিতে কোনো ডেটা বা কোড পরিবর্তন করে `git push` দিলে তা গিটহাবে চলে যাবে।
   - আপনি আপনার পিসিতে শুধু `git pull origin main` করলেই সেই ডাটাবেস আপডেট আপনার লোকাল পিসিতে চলে আসবে।
   - ঠিক একইভাবে আপনি কোনো আপডেট পুশ করলে আপনার ফ্রেন্ড `git pull` করলেই আপডেট পেয়ে যাবে।
3. **Vercel Auto-Deployment:**
   - আপনি বা আপনার ফ্রেন্ড গিটহাবের `main` ব্রাঞ্চে `push` করামাত্রই Vercel স্বয়ংক্রিয়ভাবে নতুন ডেটাসহ ওয়েবসাইটটি রি-ডিপ্লয় করে দেবে।
4. **ক্লায়েন্ট লিড ও মেসেজ:**
   - ওয়েবসাইটে কোনো ক্লায়েন্ট ফর্ম ফিলাপ করলে জিমেইল SMTP-এর মাধ্যমে সরাসরি আপনার `mominrifat8@gmail.com`-এ ব্র্যান্ডেড ইমেইল পৌঁছে যাবে।
   - ব্যাকআপ হিসেবে সব লিড লোকাল পিসিতে `leads.ndjson` ফাইলে সেভ থাকবে।
