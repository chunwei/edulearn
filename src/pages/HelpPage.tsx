import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Search, LifeBuoy, BookOpen, MessageSquare } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full text-left text-gray-700 hover:text-blue-600 focus:outline-none"
      >
        <span className="font-semibold text-lg">{question}</span>
        {isOpen ? (
          <ChevronUp className="size-5" />
        ) : (
          <ChevronDown className="size-5" />
        )}
      </button>
      {isOpen && (
        <div className="mt-3 text-gray-600 leading-relaxed">{answer}</div>
      )}
    </div>
  )
};

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: (
      <p>
        You can enroll in courses by navigating to the <Link to="/courses" className="text-blue-600 hover:underline">Courses</Link> page, 
        finding a course you're interested in, and clicking the "Enroll Now" button. Some courses may require payment.
      </p>
    )
  },
  {
    question: "How can I reset my password?",
    answer: (
      <p>
        If you've forgotten your password, you can use the "Forgot Password" link on the <Link to="/login" className="text-blue-600 hover:underline">Login</Link> page. 
        If you are logged in and want to change your password, go to the <Link to="/settings" className="text-blue-600 hover:underline">Settings</Link> page under Account Security.
      </p>
    )
  },
  {
    question: "Where can I find my course materials?",
    answer: "Once enrolled, you can access your course materials, including videos, documents, and assignments, from the course detail page or your My Courses dashboard."
  },
  {
    question: "How do I contact an instructor?",
    answer: (
        <p>
            You can contact your instructor through the <Link to="/messages" className="text-blue-600 hover:underline">Messages</Link> feature once you are enrolled in their course. 
            Some instructors may also provide contact information within the course materials or announcements.
        </p>
    )
  },
  {
    question: "What if I have a technical issue?",
    answer: "For technical issues, please try clearing your browser cache and cookies first. If the problem persists, you can contact our support team through the contact form below or by emailing support@edulearn.example.com."
  }
];

export function HelpPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <header className="text-center mb-12">
        <LifeBuoy className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
          Help Center
        </h1>
        <p className="text-xl text-gray-600 mt-3">
          We're here to help! Find answers to common questions or contact us.
        </p>
      </header>

      <section className="mb-12 p-6 bg-white shadow-lg rounded-lg">
        <div className="relative mb-8">
          <Input
            type="text"
            placeholder="Search FAQs (e.g., password, enrollment)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 py-3 text-lg"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 size-6 text-gray-400" />
        </div>
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">
            No FAQs found matching your search term.
          </p>
        )}
      </section>

      <section className="grid md:grid-cols-3 gap-8 mb-12 text-center">
        <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <BookOpen className="size-10 text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Browse Documentation
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Explore detailed guides and tutorials for using EduLearn.
          </p>
          <Button variant="outline" size="sm">
            View Docs (Soon)
          </Button>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <MessageSquare className="size-10 text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Community Forum
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Ask questions and share knowledge with other users.
          </p>
          <Button variant="outline" size="sm">
            <Link to="/discussion">Visit Forum</Link>
          </Button>
        </div>
        <div className="p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow">
          <LifeBuoy className="size-10 text-blue-600 mx-auto mb-3" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Contact Support
          </h3>
          <p className="text-gray-600 text-sm mb-3">
            Can't find what you need? Our support team is ready to assist.
          </p>
          <Button /*variant="default"*/ size="sm">Contact Us (Soon)</Button>
        </div>
      </section>

      {/* Optional: Contact Form Section */}
      {/* 
      <section className="p-8 bg-white shadow-xl rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Still Need Help? Contact Us</h2>
        <form className="space-y-6 max-w-lg mx-auto">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <Input type="text" name="name" id="name" required className="mt-1" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <Input type="email" name="email" id="email" required className="mt-1" />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
            <Input type="text" name="subject" id="subject" required className="mt-1" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea id="message" name="message" rows={4} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
          </div>
          <div className="text-center">
            <Button type="submit" size="lg">Send Message</Button>
          </div>
        </form>
      </section>
      */}
    </div>
  )
} 