export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 md:py-24 w-full">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">Get in Touch</h1>
        <p className="text-gray-500 mt-4 text-lg">Have a question about an order or our gear? We're here to help.</p>
      </div>

      <form className="bg-gray-50 p-8 md:p-12 rounded-[2rem] shadow-sm flex flex-col gap-6" onSubmit={e => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="name">Name</label>
            <input 
              id="name"
              type="text" 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all"
              placeholder="your@email.com"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2" htmlFor="message">Message</label>
          <textarea 
            id="message"
            rows={5}
            className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition-all resize-none"
            placeholder="How can we help you?"
          />
        </div>

        <button 
          className="w-full bg-black text-white hover:bg-gray-900 font-bold uppercase tracking-widest py-4 rounded-xl shadow-lg transition-transform hover:-translate-y-1"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
