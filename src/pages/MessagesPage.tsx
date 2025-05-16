import React, { useState, useEffect, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { mockMessages, mockUsers } from '../data/mockData';
import { Message, User } from '../types';
import { Send, Search, CornerDownLeft, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';

interface Conversation {
  id: string; // Could be composite key of user IDs or a dedicated conversation ID
  otherUser: User;
  lastMessage: Message;
  unreadCount: number;
}

export function MessagesPage() {
  const { user: authUser } = useAuth();
  const { conversationId: activeConversationParam } = useParams<{ conversationId?: string }>();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authUser) return;

    // 1. Aggregate conversations for the logged-in user
    const userMessages = mockMessages.filter(m => m.senderId === authUser.id || m.receiverId === authUser.id);
    const conversationPartners = new Set<string>();
    userMessages.forEach(m => {
      if (m.senderId !== authUser.id) conversationPartners.add(m.senderId);
      if (m.receiverId !== authUser.id) conversationPartners.add(m.receiverId);
    });

    const loadedConversations: Conversation[] = Array.from(conversationPartners).map(partnerId => {
      const otherUser = mockUsers.find(u => u.id === partnerId);
      if (!otherUser) return null; // Should not happen with consistent mock data

      const relevantMessages = userMessages
        .filter(m => (m.senderId === partnerId && m.receiverId === authUser.id) || (m.senderId === authUser.id && m.receiverId === partnerId))
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      const lastMessage = relevantMessages[0];
      const unreadCount = relevantMessages.filter(m => m.receiverId === authUser.id && !m.isRead).length;
      
      return {
        id: partnerId, // Use partnerId as conversationId for simplicity
        otherUser,
        lastMessage,
        unreadCount
      };
    }).filter(Boolean) as Conversation[];
    
    loadedConversations.sort((a,b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime());
    setConversations(loadedConversations);

    // 2. Set active conversation based on URL param or first in list
    if (activeConversationParam) {
        const found = loadedConversations.find(c => c.id === activeConversationParam);
        setActiveConversation(found || (loadedConversations.length > 0 ? loadedConversations[0] : null));
    } else if (loadedConversations.length > 0) {
        setActiveConversation(loadedConversations[0]);
    }

  }, [authUser, mockMessages, activeConversationParam]); // mockMessages dependency for potential updates

  useEffect(() => {
    if (activeConversation && authUser) {
      const currentMessages = mockMessages
        .filter(m => 
          (m.senderId === authUser.id && m.receiverId === activeConversation.otherUser.id) ||
          (m.senderId === activeConversation.otherUser.id && m.receiverId === authUser.id)
        )
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      setMessages(currentMessages);
      // Mark messages as read (mock implementation)
      // In a real app, this would be an API call
      currentMessages.forEach(m => {
          if(m.receiverId === authUser.id && !m.isRead) m.isRead = true;
      });
      // Update unread count in conversations list (visual only for mock)
      setConversations(prev => prev.map(c => c.id === activeConversation.id ? {...c, unreadCount: 0} : c));
    } else {
      setMessages([]);
    }
  }, [activeConversation, authUser, mockMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !authUser || !activeConversation) return;
    const messageData: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage.trim(),
      senderId: authUser.id,
      receiverId: activeConversation.otherUser.id,
      timestamp: new Date().toISOString(),
      isRead: false,
    };
    // Add to mockMessages (in a real app, send to backend)
    mockMessages.push(messageData); 
    setMessages(prev => [...prev, messageData]);
    setNewMessage('');

    // Update last message in conversations list
    setConversations(prevConvos => prevConvos.map(convo => 
        convo.id === activeConversation.id ? { ...convo, lastMessage: messageData } : convo
    ).sort((a,b) => new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime()));
  };
  
  const filteredConversations = conversations.filter(convo => 
    convo.otherUser.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!authUser) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <p className="text-xl">Please <Link to="/login" className="text-blue-600 hover:underline">log in</Link> to view your messages.</p>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)]"> {/* Assuming 4rem navbar height */} 
      {/* Sidebar for Conversations List */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Chats</h2>
          <div className="relative mt-2">
            <Input 
              type="text" 
              placeholder="Search users..." 
              className="pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
        <div className="overflow-y-auto flex-grow">
          {filteredConversations.length > 0 ? filteredConversations.map(convo => (
            <Link 
                to={`/messages/${convo.id}`} 
                key={convo.id} 
                onClick={() => setActiveConversation(convo)}
                className={`block p-4 hover:bg-gray-100 border-b border-gray-200 ${activeConversation?.id === convo.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
            >
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={convo.otherUser.avatar} alt={convo.otherUser.name} />
                    <AvatarFallback>{convo.otherUser.name.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-grow truncate">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm truncate">{convo.otherUser.name}</h3>
                    {convo.unreadCount > 0 && 
                        <span className="bg-blue-500 text-white text-xs rounded-full px-1.5 py-0.5 font-semibold">
                            {convo.unreadCount}
                        </span>
                    }
                  </div>
                  <p className={`text-xs truncate ${convo.unreadCount > 0 ? 'text-gray-800 font-medium' : 'text-gray-500'}`}>{convo.lastMessage.content}</p>
                </div>
              </div>
            </Link>
          )) : (
            <p className="p-4 text-sm text-gray-500 text-center">No conversations found.</p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {activeConversation ? (
          <>
            <div className="p-4 border-b border-gray-200 flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                    <AvatarImage src={activeConversation.otherUser.avatar} alt={activeConversation.otherUser.name} />
                    <AvatarFallback>{activeConversation.otherUser.name.substring(0,1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-semibold text-lg">{activeConversation.otherUser.name}</h3>
                    <p className="text-xs text-green-500">Online</p> {/* Placeholder status */} 
                </div>
            </div>
            
            <div className="flex-grow overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.senderId === authUser.id ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${msg.senderId === authUser.id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                    <p className="text-sm">{msg.content}</p>
                    <p className={`text-xs mt-1 ${msg.senderId === authUser.id ? 'text-blue-200' : 'text-gray-500'} text-right`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t border-gray-200 bg-white">
              <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center space-x-3">
                <Input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-grow"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-5 w-5" /> 
                  <span className="ml-2 hidden sm:inline">Send</span>
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <CornerDownLeft className="h-16 w-16 mb-4 text-gray-300" />
            <h2 className="text-xl font-semibold">Select a conversation</h2>
            <p className="text-sm">Choose a user from the list to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
} 