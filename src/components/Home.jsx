import React, { useState } from 'react';
import { Coffee, Book, Globe, Users, Palette, Leaf, Clock, Utensils, User, ArrowLeft, Home, Award, BarChart, Play, FileText, Image, Lock, Star, Download, ThumbsUp, MessageSquare, Bookmark, Share2, Heart, Target } from 'lucide-react';
import { ChatbotAssistant } from './Chatbot';
import { MembershipExample } from './Membership';

// Define constant data
const MODULES_DATA = [
  { 
    icon: Coffee, 
    title: "Coffee Education", 
    content: "Learn about coffee origins, brewing techniques, and flavor profiles.",
    courses: [
      { id: 1, title: "Coffee Brewing Mastery", description: "Master the art of brewing perfect coffee using various methods.", duration: "4 weeks", difficulty: "Intermediate" },
      { id: 2, title: "Coffee Origins and Varietals", description: "Explore the diverse world of coffee beans and their unique characteristics.", duration: "3 weeks", difficulty: "Beginner" },
    ]
  },
  { 
    icon: Book, 
    title: "Mindfulness & Wellness", 
    content: "Discover practices to enhance your well-being through mindful coffee experiences.",
    courses: [
      { id: 3, title: "Mindful Coffee Rituals", description: "Combine mindfulness practices with your daily coffee routine.", duration: "2 weeks", difficulty: "Beginner" },
      { id: 4, title: "Coffee and Meditation", description: "Learn to use coffee as a focal point for meditation and relaxation.", duration: "3 weeks", difficulty: "Intermediate" },
    ]
  },
  {
    icon: Globe,
    title: "Coffee Culture",
    content: "Explore coffee traditions from around the world.",
    courses: [
      { id: 5, title: "Global Coffee Traditions", description: "Learn about coffee customs and rituals worldwide.", duration: "4 weeks", difficulty: "Beginner" },
      { id: 6, title: "Coffee History", description: "Discover the fascinating history of coffee through the ages.", duration: "3 weeks", difficulty: "Beginner" },
    ]
  },
  {
    icon: Palette,
    title: "Coffee Arts",
    content: "Express your creativity through coffee.",
    courses: [
      { id: 7, title: "Latte Art Basics", description: "Learn to create beautiful designs in your coffee.", duration: "3 weeks", difficulty: "Intermediate" },
      { id: 8, title: "Coffee Photography", description: "Capture the beauty of coffee through your lens.", duration: "2 weeks", difficulty: "Beginner" },
    ]
  }
];

const COURSE_CONTENT = {
  modules: [
    {
      title: "Module 1: Introduction to Coffee",
      content: [
        { type: "video", title: "Welcome to Coffee Brewing", duration: "15:30", free: true },
        { type: "pdf", title: "Coffee Basics Guide", size: "2.5 MB", free: true },
        { type: "video", title: "Understanding Coffee Origins", duration: "20:45", free: false },
        { type: "pdf", title: "Brewing Equipment Guide", size: "1.8 MB", free: false },
      ]
    },
    {
      title: "Module 2: Brewing Techniques",
      content: [
        { type: "video", title: "Pour-Over Basics", duration: "18:20", free: false },
        { type: "pdf", title: "Brewing Ratios Guide", size: "1.8 MB", free: false },
        { type: "video", title: "Advanced Techniques", duration: "25:10", free: false },
        { type: "pdf", title: "Troubleshooting Guide", size: "1.5 MB", free: false },
      ]
    }
  ]
};

export  function ZendayaPlatformMockup() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedModule, setSelectedModule] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);

  // Reusable Card Components
  const ModuleCard = ({ icon: Icon, title, onClick }) => (
    <div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer border border-[#1c91be]" 
      onClick={onClick}
    >
      <Icon className="w-8 h-8 mb-2 text-brown-600" />
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
  );

  const CourseCard = ({ title, description, duration, difficulty, onClick }) => (
    <div 
      className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between text-sm text-gray-500">
        <span>Duration: {duration}</span>
        <span>Level: {difficulty}</span>
      </div>
    </div>
  );

  // Resource Components
  const ResourceItem = ({ type, title, duration, size, free }) => (
    <div className="flex items-center justify-between p-4 border-b hover:bg-gray-50">
      <div className="flex items-center space-x-4">
        <div className="text-brown-600">
          {type === 'video' ? <Play className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <span className="text-sm text-gray-500">
            {duration ? `Duration: ${duration}` : `Size: ${size}`}
          </span>
        </div>
      </div>
      {free ? (
        <button 
          onClick={() => setSelectedResource({ type, title, duration, size })}
          className="px-4 py-2 text-sm text-brown-600 border border-brown-600 rounded hover:bg-brown-50"
        >
          Access Now
        </button>
      ) : (
        <Lock className="w-5 h-5 text-gray-400" />
      )}
    </div>
  );

  // Content Viewer Components
  const VideoPlayer = () => (
    <div className="bg-gray-800 relative aspect-video rounded-lg overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img src="/api/placeholder/800/450" alt="Video thumbnail" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <Play className="w-16 h-16 text-white" />
        </div>
      </div>
    </div>
  );

  const PDFViewer = () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 p-4 border-b flex justify-between items-center">
        <span className="font-medium">Course Document</span>
        <button className="flex items-center space-x-2 text-brown-600 hover:text-brown-800">
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
      </div>
      <div className="p-8 bg-white">
        <img src="/api/placeholder/600/800" alt="PDF preview" className="w-full rounded-lg shadow-lg" />
      </div>
    </div>
  );

  // Main Section Renders
  const AboutSection = () => (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-brown-800 mb-6">Welcome to Zendaya Coffee Studio</h2>
      <p className="text-lg text-brown-600 mb-8">
        Where coffee culture meets mindful learning and community connection.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Coffee className="w-8 h-8 mb-4 text-brown-600" />
          <h3 className="text-xl font-semibold mb-2">Coffee Excellence</h3>
          <p className="text-gray-600">Master the art of coffee brewing</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Heart className="w-8 h-8 mb-4 text-brown-600" />
          <h3 className="text-xl font-semibold mb-2">Mindful Practice</h3>
          <p className="text-gray-600">Transform your coffee ritual</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Users className="w-8 h-8 mb-4 text-brown-600" />
          <h3 className="text-xl font-semibold mb-2">Community</h3>
          <p className="text-gray-600">Connect with coffee enthusiasts</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Target className="w-8 h-8 mb-4 text-brown-600" />
          <h3 className="text-xl font-semibold mb-2">Growth</h3>
          <p className="text-gray-600">Track your learning journey</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-bold mb-6">Why Choose Zendaya Coffee Studio?</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-2">For Coffee Enthusiasts</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Expert-led courses</li>
              <li>Hands-on techniques</li>
              <li>Coffee origin exploration</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">For Wellness Seekers</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              <li>Mindfulness practices</li>
              <li>Meditation guides</li>
              <li>Community support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <>
      <AboutSection />
      <h2 className="text-2xl font-semibold text-brown-800 mb-4">Explore Our Modules</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MODULES_DATA.map((module, index) => (
          <ModuleCard 
            key={index} 
            icon={module.icon} 
            title={module.title} 
            onClick={() => setSelectedModule(index)} 
          />
        ))}
      </div>
      <h2 className="text-2xl font-semibold text-brown-800 mt-8">Choose Your Membership</h2>
      <MembershipExample />
    </>
  );

  const renderModule = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button 
        onClick={() => setSelectedModule(null)} 
        className="flex items-center text-brown-600 hover:text-brown-800"
      >
        <ArrowLeft className="mr-2" /> Back to Modules
      </button>
      <h2 className="text-2xl font-semibold mt-4 mb-4">{MODULES_DATA[selectedModule].title}</h2>
      <p className="text-gray-600 mb-6">{MODULES_DATA[selectedModule].content}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MODULES_DATA[selectedModule].courses.map((course) => (
          <CourseCard 
            key={course.id} 
            {...course} 
            onClick={() => setSelectedCourse(course)} 
          />
        ))}
      </div>
    </div>
  );

  const renderCourseContent = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button 
        onClick={() => setSelectedCourse(null)} 
        className="flex items-center text-brown-600 hover:text-brown-800"
      >
        <ArrowLeft className="mr-2" /> Back to Module
      </button>
      <h2 className="text-2xl font-semibold mt-4 mb-4">{selectedCourse?.title}</h2>
      <p className="text-gray-600 mb-6">{selectedCourse?.description}</p>
      
      <div className="space-y-6">
        {COURSE_CONTENT.modules.map((module, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <h3 className="font-semibold p-4 bg-gray-50 border-b">{module.title}</h3>
            <div className="divide-y">
              {module.content.map((item, i) => (
                <ResourceItem key={i} {...item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ResourceViewer = ({ resource, onClose }) => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <button onClick={onClose} className="flex items-center text-brown-600 hover:text-brown-800">
        <ArrowLeft className="mr-2" /> Back
      </button>
      <h2 className="text-2xl font-semibold mt-4 mb-6">{resource.title}</h2>
      {resource.type === 'video' ? <VideoPlayer /> : <PDFViewer />}
      <div className="mt-6">
        <h3 className="font-semibold text-lg mb-4">Description</h3>
        <p className="text-gray-600">
          Learn the fundamentals of coffee brewing in this comprehensive guide.
        </p>
      </div>
    </div>
  );

  // Main Render
  return (
    <div className="bg-amber-50 min-h-screen p-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-brown-800 mb-2">Zendaya Coffee Studio</h1>
        <p className="text-xl text-brown-600">Educational Platform</p>
      </header>
      
      <nav className="mb-8">
        <ul className="flex space-x-4 text-brown-700">
          <li 
            className="hover:underline cursor-pointer" 
            onClick={() => { 
              setCurrentView('home'); 
              setSelectedModule(null); 
              setSelectedCourse(null); 
            }}
          >
            <Home className="inline-block mr-1" size={18} /> Home
          </li>
          <li className="hover:underline cursor-pointer" onClick={() => setCurrentView('community')}>
            <Users className="inline-block mr-1" size={18} /> Community
          </li>
          <li className="hover:underline cursor-pointer" onClick={() => setCurrentView('achievements')}>
            <Award className="inline-block mr-1" size={18} /> Achievements
          </li>
          <li className="hover:underline cursor-pointer" onClick={() => setCurrentView('progress')}>
            <BarChart className="inline-block mr-1" size={18} /> My Progress
          </li>
        </ul>
      </nav>
      
      <main className="min-h-[600px]">
        {selectedResource ? (
          <ResourceViewer 
            resource={selectedResource} 
            onClose={() => setSelectedResource(null)} 
          />
        ) : (
          <>
            {/* Home View */}
            {currentView === 'home' && selectedModule === null && selectedCourse === null && renderHome()}
            
            {/* Module View */}
            {currentView === 'home' && selectedModule !== null && selectedCourse === null && renderModule()}
            
            {/* Course View */}
            {currentView === 'home' && selectedCourse !== null && renderCourseContent()}
            
            {/* Community View */}
            {currentView === 'community' && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Community Hub</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Discussion Forums</h3>
                    <ul className="space-y-2">
                      <li className="p-2 hover:bg-gray-50 cursor-pointer rounded">
                        <div className="font-medium">Coffee Brewing Tips</div>
                        <div className="text-sm text-gray-600">Share your brewing experiences</div>
                      </li>
                      <li className="p-2 hover:bg-gray-50 cursor-pointer rounded">
                        <div className="font-medium">Mindful Coffee Moments</div>
                        <div className="text-sm text-gray-600">Discuss mindfulness practices</div>
                      </li>
                    </ul>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Upcoming Events</h3>
                    <ul className="space-y-2">
                      <li className="p-2 hover:bg-gray-50 cursor-pointer rounded">
                        <div className="font-medium">Virtual Coffee Tasting</div>
                        <div className="text-sm text-gray-600">This Saturday at 2 PM</div>
                      </li>
                      <li className="p-2 hover:bg-gray-50 cursor-pointer rounded">
                        <div className="font-medium">Latte Art Workshop</div>
                        <div className="text-sm text-gray-600">Next Wednesday at 6 PM</div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
            
            {/* Achievements View */}
            {currentView === 'achievements' && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Your Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 text-center">
                    <Award className="w-12 h-12 mx-auto mb-2 text-brown-600" />
                    <h3 className="font-semibold">Coffee Explorer</h3>
                    <p className="text-sm text-gray-600">Completed 5 courses</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center bg-gray-50">
                    <Award className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <h3 className="font-semibold text-gray-400">Master Brewer</h3>
                    <p className="text-sm text-gray-400">Complete 10 courses to unlock</p>
                  </div>
                  <div className="border rounded-lg p-4 text-center bg-gray-50">
                    <Award className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <h3 className="font-semibold text-gray-400">Coffee Guru</h3>
                    <p className="text-sm text-gray-400">Complete all courses to unlock</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Progress View */}
            {currentView === 'progress' && (
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-6">Learning Progress</h2>
                <div className="space-y-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Coffee Brewing Mastery</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-brown-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>Progress: 60%</span>
                      <span>12/20 Lessons Completed</span>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Mindful Coffee Rituals</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-brown-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>Progress: 30%</span>
                      <span>6/20 Lessons Completed</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
      
      <footer className="mt-12 text-center text-brown-600">
        <p className="mb-2">&copy; 2024 Zendaya Coffee Studio. All rights reserved.</p>
        <div className="flex justify-center space-x-4">
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Contact Us</a>
        </div>
      </footer>
      <ChatbotAssistant /> 
    </div>
  );
}