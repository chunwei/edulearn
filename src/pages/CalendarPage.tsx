import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer, View } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import { enUS } from 'date-fns/locale/en-US';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { mockCalendarEvents } from '../data/mockData';
import { CalendarEvent as MyCalendarEventType } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { PlusCircle, AlertTriangle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface EventModalProps {
  event: MyCalendarEventType | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (eventData: MyCalendarEventType) => void;
  isNew?: boolean;
}

const EventModal: React.FC<EventModalProps> = ({
  event,
  isOpen,
  onClose,
  onSave,
  isNew
}) => {
  const [title, setTitle] = useState(event?.title || '')
  const [start, setStart] = useState(
    event?.start
      ? new Date(event.start).toISOString().substring(0, 16)
      : new Date().toISOString().substring(0, 16)
  )
  const [end, setEnd] = useState(
    event?.end
      ? new Date(event.end).toISOString().substring(0, 16)
      : new Date(new Date().getTime() + 60 * 60 * 1000)
          .toISOString()
          .substring(0, 16)
  )
  const [description, setDescription] = useState(event?.description || '')
  const [type, setType] = useState<MyCalendarEventType['type']>(
    event?.type || 'personal'
  )
  const [allDay, setAllDay] = useState(event?.allDay || false)

  useEffect(() => {
    if (event) {
      setTitle(event.title || '')
      setStart(
        event.start
          ? new Date(event.start).toISOString().substring(0, 16)
          : new Date().toISOString().substring(0, 16)
      )
      setEnd(
        event.end
          ? new Date(event.end).toISOString().substring(0, 16)
          : new Date(new Date().getTime() + 60 * 60 * 1000)
              .toISOString()
              .substring(0, 16)
      )
      setDescription(event.description || '')
      setType(event.type || 'personal')
      setAllDay(event.allDay || false)
    } else {
      // Reset for new event
      setTitle('')
      setStart(new Date().toISOString().substring(0, 16))
      setEnd(
        new Date(new Date().getTime() + 60 * 60 * 1000)
          .toISOString()
          .substring(0, 16)
      )
      setDescription('')
      setType('personal')
      setAllDay(false)
    }
  }, [event, isOpen])

  if (!isOpen) return null

  const handleSubmit = () => {
    const newEventData: MyCalendarEventType = {
      id: event?.id || `evt-${Date.now()}`,
      title,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
      description,
      type,
      allDay
      // courseId and userId would need to be set if applicable, perhaps via more fields in modal
    }
    onSave(newEventData)
    onClose()
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          {isNew ? 'Add New Event' : 'Edit Event'}
        </h2>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border rounded-md shadow-sm p-2"
            />
          </div>
          <div>
            <label
              htmlFor="start"
              className="block text-sm font-medium text-gray-700"
            >
              Start
            </label>
            <input
              type="datetime-local"
              id="start"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="mt-1 block w-full border  rounded-md shadow-sm p-2"
              disabled={allDay}
            />
          </div>
          <div>
            <label
              htmlFor="end"
              className="block text-sm font-medium text-gray-700"
            >
              End
            </label>
            <input
              type="datetime-local"
              id="end"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="mt-1 block w-full border  rounded-md shadow-sm p-2"
              disabled={allDay}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="allDay"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              className="size-4 text-blue-600  rounded"
            />
            <label
              htmlFor="allDay"
              className="ml-2 block text-sm text-gray-900"
            >
              All day
            </label>
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700"
            >
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) =>
                setType(e.target.value as MyCalendarEventType['type'])
              }
              className="mt-1 block w-full border  rounded-md shadow-sm p-2"
            >
              <option value="personal">Personal</option>
              <option value="live-class">Live Class</option>
              <option value="assignment-due">Assignment Due</option>
              <option value="study-session">Study Session</option>
              <option value="exam">Exam</option>
              <option value="holiday">Holiday</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description (Optional)
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full border  rounded-md shadow-sm p-2"
            ></textarea>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Event</Button>
        </div>
      </div>
    </div>
  )
}

export function CalendarPage() {
  const { user: authUser } = useAuth()
  const [events, setEvents] = useState<MyCalendarEventType[]>([])
  const [selectedEvent, setSelectedEvent] =
    useState<MyCalendarEventType | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isNewEvent, setIsNewEvent] = useState(false)
  const [currentView, setCurrentView] = useState<View>('month')

  useEffect(() => {
    // Filter events for the logged-in user or show all public/course events
    // This is a simplified example; a real app would have more complex logic
    if (authUser) {
      const userEvents = mockCalendarEvents.filter(
        (event) =>
          event.userId === authUser.id || // Events specific to the user
          !event.userId || // Public events or general course events not tied to a specific user for creation
          event.type === 'live-class' ||
          event.type === 'assignment-due' // Show all academic events for now
      )
      setEvents(userEvents)
    } else {
      // Show only public events if no user is logged in (e.g., holidays)
      setEvents(
        mockCalendarEvents.filter(
          (event) => !event.userId && event.type === 'holiday'
        )
      )
    }
  }, [authUser])

  const handleSelectEvent = (event: MyCalendarEventType) => {
    setSelectedEvent(event)
    setIsNewEvent(false)
    setIsModalOpen(true)
  }

  const handleSelectSlot = (slotInfo: {
    start: Date
    end: Date
    action: 'select' | 'click' | 'doubleClick'
  }) => {
    if (slotInfo.action === 'doubleClick' || slotInfo.action === 'select') {
      setSelectedEvent({
        id: ``, // Will be generated on save
        title: '',
        start: slotInfo.start.toISOString(),
        end: slotInfo.end.toISOString(),
        type: 'personal'
      })
      setIsNewEvent(true)
      setIsModalOpen(true)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedEvent(null)
  }

  const saveEvent = (eventData: MyCalendarEventType) => {
    if (isNewEvent) {
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...eventData, id: `evt-${Date.now()}-${Math.random()}` }
      ])
    } else {
      setEvents((prevEvents) =>
        prevEvents.map((ev) => (ev.id === eventData.id ? eventData : ev))
      )
    }
    // In a real app, you would also send this to a backend API
  }

  const eventStyleGetter = (event: MyCalendarEventType) => {
    const style = {
      backgroundColor:
        event.color ||
        (event.type === 'live-class'
          ? '#3174ad'
          : event.type === 'assignment-due'
          ? '#ff9f89'
          : '#4caf50'),
      borderRadius: '5px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block'
    }
    return {
      style: style
    }
  }

  if (!authUser && currentView !== 'month') {
    // Limit views if not logged in, or handle differently
    // Optionally, redirect to login or show a restricted view
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold ">Calendar</h1>
          <p className="text-md text-muted-foreground">
            Manage your schedule, deadlines, and important events.
          </p>
        </div>
        {authUser && (
          <Button
            onClick={() => {
              setSelectedEvent(null)
              setIsNewEvent(true)
              setIsModalOpen(true)
            }}
          >
            <PlusCircle className="mr-2 size-5" /> Add Event
          </Button>
        )}
      </header>

      {!authUser && (
        <div
          className="p-4 mb-4 text-sm text-yellow-700 bg-yellow-100 rounded-lg text-center"
          role="alert"
        >
          <AlertTriangle className="inline mr-2 size-5" /> You are viewing a
          public calendar.{' '}
          <Link to="/login" className="font-semibold hover:underline">
            Log in
          </Link>{' '}
          to see your personalized events and add new ones.
        </div>
      )}

      <div className="p-2 sm:p-4 rounded-lg shadow h-[70vh] min-h-[600px]">
        <Calendar
          localizer={localizer}
          events={events.map((e) => ({
            ...e,
            start: new Date(e.start),
            end: new Date(e.end)
          }))}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '100%' }}
          selectable
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          eventPropGetter={eventStyleGetter}
          view={currentView}
          onView={(view: View) => setCurrentView(view)}
          // components={{
          //   event: CustomEventComponent // Optional: for highly custom event rendering
          // }}
        />
      </div>
      <EventModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={saveEvent}
        isNew={isNewEvent}
      />
    </div>
  )
}

// Optional Custom Event Component Example
// const CustomEventComponent: React.FC<EventProps<MyCalendarEventType>> = ({ event }) => (
//   <div title={event.description} className="p-1">
//     <strong>{event.title}</strong>
//     {event.description && <p className="text-xs truncate">{event.description}</p>}
//   </div>
// ); 