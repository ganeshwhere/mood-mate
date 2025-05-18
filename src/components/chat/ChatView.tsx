import { useState, useRef, useEffect } from 'react';
import { Send, Bot, RefreshCcw, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import PageContainer from '../layout/PageContainer';
import '@/styles/scrollbar.css';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Sample conversation starters
const conversationStarters = [
  "I'm feeling anxious about my upcoming presentation",
  'How can I improve my sleep habits?',
  "I've been feeling down lately",
  'What are some good stress management techniques?',
  'How can I build a better morning routine?',
  'I want to practice more mindfulness',
];

// Sample responses for demo purposes
const sampleResponses: Record<string, string> = {
  "I'm feeling anxious about my upcoming presentation":
    "Feeling anxious about presentations is completely normal. Here are some strategies that might help:\n\n1. **Prepare thoroughly** - The more familiar you are with your material, the more confident you'll feel.\n\n2. **Practice deep breathing** - Try the 4-7-8 technique: inhale for 4 seconds, hold for 7, exhale for 8.\n\n3. **Visualize success** - Spend time imagining yourself delivering a successful presentation.\n\n4. **Reframe your thinking** - Think of your anxiety as excitement; both are similar physiological states.\n\n5. **Focus on your message** - Remember that your audience is interested in what you have to say, not how nervous you might appear.\n\nWould you like to discuss any of these strategies in more detail?",

  'How can I improve my sleep habits?':
    "Improving sleep habits can have a profound effect on your overall wellbeing. Here are some evidence-based recommendations:\n\n1. **Consistent schedule** - Try to go to bed and wake up at the same times every day, even on weekends.\n\n2. **Create a restful environment** - Keep your bedroom cool, dark, and quiet.\n\n3. **Digital sunset** - Avoid screens at least 1 hour before bedtime as blue light can interfere with melatonin production.\n\n4. **Mindful eating and drinking** - Limit caffeine after noon and avoid large meals close to bedtime.\n\n5. **Relaxation routine** - Develop a pre-sleep ritual that helps signal to your body that it's time to wind down.\n\nWhich of these areas do you think might be most helpful for your situation?",

  "I've been feeling down lately":
    "I'm sorry to hear you've been feeling down. Sometimes these feelings can be temporary responses to life events, while other times they may indicate something that needs more attention.\n\n1. **Connect with others** - Even brief social interactions can help improve mood.\n\n2. **Physical movement** - Exercise releases endorphins that can help elevate your mood.\n\n3. **Mindfulness practices** - Meditation and mindfulness can help you stay present rather than dwelling on negative thoughts.\n\n4. **Professional support** - If your feelings persist or interfere with daily functioning, consider speaking with a mental health professional.\n\n5. **Self-compassion** - Treat yourself with the same kindness you would offer a good friend.\n\nWould you like to share more about what might be contributing to these feelings?",

  'What are some good stress management techniques?':
    'Managing stress effectively is crucial for mental and physical health. Here are some techniques that many people find helpful:\n\n1. **Progressive muscle relaxation** - Tensing and then releasing each muscle group can reduce physical tension.\n\n2. **Mindful breathing** - Focus on your breath, noticing the sensation of air moving in and out of your body.\n\n3. **Physical activity** - Regular exercise is one of the most effective stress relievers.\n\n4. **Time in nature** - Even short periods outdoors can reduce stress hormones.\n\n5. **Creative expression** - Activities like journaling, art, or music can provide emotional release.\n\n6. **Setting boundaries** - Learning to say no and protecting your time and energy.\n\nWhich of these techniques sounds most appealing to try?',

  'How can I build a better morning routine?':
    "A thoughtful morning routine can set a positive tone for your entire day. Here are some elements to consider:\n\n1. **Hydration first** - Drinking water when you wake up helps rehydrate your body after sleep.\n\n2. **Mindful moments** - Even just 5 minutes of meditation or deep breathing can center your mind.\n\n3. **Movement** - Gentle stretching or more vigorous exercise can energize your body.\n\n4. **Nourishment** - A balanced breakfast provides fuel for your brain and body.\n\n5. **Intention setting** - Taking a moment to identify your priorities for the day.\n\n6. **Delayed digital** - Consider waiting to check emails and social media until after you've completed your routine.\n\nThe ideal routine is one that feels good to you and that you can maintain consistently. Would you like to discuss how to implement any of these ideas?",

  'I want to practice more mindfulness':
    "It's wonderful that you're interested in developing a mindfulness practice. Mindfulness can help reduce stress, improve focus, and increase overall wellbeing. Here are some ways to get started:\n\n1. **Guided meditations** - Apps like Headspace, Calm, or Insight Timer offer structured guidance.\n\n2. **Mindful activities** - Practice bringing full attention to everyday actions like eating, walking, or washing dishes.\n\n3. **Body scan practice** - Systematically notice sensations throughout your body without judgment.\n\n4. **Breath awareness** - Simply observing your natural breath can be a powerful mindfulness practice.\n\n5. **Regular, short sessions** - 5 minutes daily is more beneficial than 35 minutes once a week.\n\n6. **Self-compassion** - Remember that mindfulness isn't about 'perfect' focus but noticing when your mind wanders and gently returning to the present.\n\nWould you like to discuss a specific type of mindfulness practice that interests you?",
};

const ChatView = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      content:
        "Hello! I'm Mood Mate, your AI companion for mental wellbeing. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string = inputValue) => {
    if (!content.trim()) return;

    // User message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          sampleResponses[content] ||
          "Thank you for sharing. I'm here to support you on your mental health journey. Could you tell me more about how you've been feeling recently?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStarterClick = (starter: string) => {
    handleSendMessage(starter);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome',
        content:
          "Hello! I'm Mood Mate, your AI companion for mental wellbeing. How are you feeling today?",
        sender: 'bot',
        timestamp: new Date(),
      },
    ]);
  };

  return (
    <PageContainer title="Mood Mate AI" subtitle="Talk with your AI mental health companion">
      <div className="h-[calc(100vh-240px)] flex flex-col bg-card rounded-xl border shadow-sm overflow-hidden animate-fade-in">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <Bot size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium">Mood Mate AI</h3>
              <p className="text-xs text-muted-foreground">Your mental health companion</p>
            </div>
          </div>
          <button
            onClick={handleResetChat}
            className="p-2 rounded hover:bg-secondary transition-colors"
            aria-label="Reset chat"
          >
            <RefreshCcw size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 scrollbar-thick">
          {messages.length === 1 && (
            <div className="mb-6 animate-fade-in">
              <h3 className="flex items-center text-sm font-medium mb-3">
                <Sparkles size={16} className="text-primary mr-2" />
                Try asking about:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {conversationStarters.map((starter, index) => (
                  <button
                    key={index}
                    onClick={() => handleStarterClick(starter)}
                    className="text-left p-3 text-sm rounded-lg border hover:bg-secondary transition-colors"
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map(message => (
            <div
              key={message.id}
              className={cn(
                'mb-4 max-w-[80%] animate-fade-in',
                message.sender === 'user' ? 'ml-auto' : 'mr-auto'
              )}
            >
              <div
                className={cn(
                  'rounded-2xl p-3',
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground'
                )}
              >
                <div className="whitespace-pre-line">{message.content}</div>
              </div>
              <div
                className={cn(
                  'text-xs text-muted-foreground mt-1',
                  message.sender === 'user' ? 'text-right' : 'text-left'
                )}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center mb-4">
              <div className="bg-secondary text-secondary-foreground rounded-2xl p-3 flex space-x-1">
                <span className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"></span>
                <span
                  className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"
                  style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                  className="w-2 h-2 bg-primary/50 rounded-full animate-pulse"
                  style={{ animationDelay: '0.4s' }}
                ></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex items-end gap-2">
            <textarea
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className="flex-1 resize-none rounded-lg border bg-background p-3 focus:outline-none focus:ring-2 focus:ring-primary min-h-[80px] max-h-[160px]"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputValue.trim()}
              className={cn(
                'p-3 rounded-lg transition-colors',
                inputValue.trim()
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-secondary text-muted-foreground'
              )}
            >
              <Send size={20} />
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Mood Mate is an AI assistant. Not a replacement for professional mental health support.
          </p>
        </div>
      </div>
    </PageContainer>
  );
};

export default ChatView;
