import Summary from './components/Summary'
import { useEffect, useState } from 'react'
import EventDetailModal from './components/EventDetailModal'
import EventForm from './components/EventForm'
import EventList from './components/EventList'
import { initialEvents } from './data/initialEvents'
import type { IFestivalEvent } from './interfaces/IFestivalEvent'
import { loadEvents, saveEvents } from './utils/storage'

function App() {
  const [events, setEvents] = useState<IFestivalEvent[]>(() => loadEvents(initialEvents))
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

  useEffect(() => {
    saveEvents(events)
  }, [events])

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? null
  const existingIds = events.map((event) => event.id)

    const sortedEvents = [...events].sort((a, b) =>
    `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`)
  )

  const handleAddEvent = (newEvent: IFestivalEvent) => {
    setEvents((currentEvents) => [...currentEvents, newEvent])
  }

  const handleToggleFavorite = (id: number) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) =>
        event.id === id ? { ...event, isFavorite: !event.isFavorite } : event
      )
    )
  }

  const handleDelete = (id: number) => {
    setEvents((currentEvents) => currentEvents.filter((event) => event.id !== id))
  }

  const handleViewDetails = (id: number) => {
    setSelectedEventId(id)
  }

  const handleCloseDetails = () => {
    setSelectedEventId(null)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 bg-slate-900/60 px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <h1 className="bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-300 bg-clip-text text-4xl font-extrabold text-transparent">
            Festiva
          </h1>
          <p className="text-slate-400">Gestor de Festival Musical</p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Summary events={events} />

        <EventForm existingIds={existingIds} onAddEvent={handleAddEvent} />

        <EventList
          events={sortedEvents}
          onToggleFavorite={handleToggleFavorite}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      </main>

      {selectedEvent && (
        <EventDetailModal event={selectedEvent} onClose={handleCloseDetails} />
      )}
    </div>
  )
}

export default App