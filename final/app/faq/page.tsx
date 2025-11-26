'use client';

import Navbar from '../components/Navbar';

export default function FAQPage() {
  const faqs = [
    {
      question: 'How do I create a school ID card?',
      answer: 'Simply click the "Get Started" button on the homepage, fill in your student information including name, student ID, course, year level, and birthdate. Upload your photo, customize the header color, and click "Generate Card" to see your preview. Then download it as a PNG image.',
    },
    {
      question: 'What information do I need to provide?',
      answer: 'You need to provide your student name, student ID number, course, year level, birthdate, and a photo. You can also add additional information if needed. The school name is pre-filled but can be customized.',
    },
    {
      question: 'What image formats are supported for photos?',
      answer: 'You can upload photos in any standard image format including JPG, PNG, and other common image formats. The system will automatically process and display your photo on the ID card.',
    },
    {
      question: 'Can I customize the colors of my ID card?',
      answer: 'Yes! You can choose from five different header colors: Blue, Red, Darker Blue, Brown, and Maroon. Simply select your preferred color from the color options in the form.',
    },
    {
      question: 'What is the QR code for?',
      answer: 'The QR code is an optional feature that can be included on your ID card. It can be used for quick verification or to link to additional information. You can toggle it on or off using the checkbox in the form.',
    },
    {
      question: 'Can I download my ID card?',
      answer: 'Absolutely! Once you\'ve created your ID card and are satisfied with the preview, click the "Save as Image" button to download your card as a high-quality PNG file that you can print or use digitally.',
    },
    {
      question: 'Is my information stored or saved?',
      answer: 'No, all information is processed locally in your browser. We don\'t store, save, or transmit any of your personal information. Your data remains private and secure on your device.',
    },
    {
      question: 'Can I edit my ID card after creating it?',
      answer: 'Yes! Simply modify any of the fields in the form and the preview will update in real-time. You can make as many changes as you need before downloading your final ID card.',
    },
    {
      question: 'What if I make a mistake?',
      answer: 'You can use the "Reset" button to clear all fields and start over, or simply edit any field to correct mistakes. The preview updates automatically as you type, so you can see your changes immediately.',
    },
    {
      question: 'Do I need to create an account?',
      answer: 'No account is required! IDify is completely free to use and doesn\'t require any registration or sign-up. Just visit the website and start creating your school ID card right away.',
    },
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf0d5' }}>
      <Navbar />
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold" style={{ color: '#003049' }}>
            Frequently Asked Questions
          </h1>
          <p className="text-lg" style={{ color: '#003049' }}>
            Find answers to common questions about IDify
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-6 shadow-md"
            >
              <h2
                className="mb-3 text-xl font-semibold"
                style={{ color: '#003049' }}
              >
                {faq.question}
              </h2>
              <p className="leading-relaxed" style={{ color: '#666' }}>
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-lg bg-white p-6 shadow-md text-center">
          <h2 className="mb-3 text-xl font-semibold" style={{ color: '#003049' }}>
            Still have questions?
          </h2>
          <p className="mb-4" style={{ color: '#666' }}>
            If you can't find the answer you're looking for, feel free to reach out to us.
          </p>
          <a
            href="/"
            className="inline-block rounded-md px-6 py-3 font-medium text-white transition-colors"
            style={{ backgroundColor: '#c1121f' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#a00e1a'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#c1121f'}
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}

