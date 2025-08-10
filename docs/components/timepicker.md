# ⏰ TimePicker Component - Dokumentacja

## 📖 Przegląd

TimePicker to komponent do wybierania czasu z intuicyjnymi kontrolkami. Oferuje różne formaty czasu, range selection, walidację i integrację z kalendarzami. Idealny do formularzy, harmonogramów, rezerwacji i aplikacji wymagających precyzyjnego określania czasu.

## ✨ Cechy Główne

- ⏰ **Format flexibility** - 12/24h, AM/PM, sekundy, millisekundy
- 📅 **Time ranges** - Start/end time selection z walidacją
- 🎯 **Step controls** - Niestandardowe kroki dla minut i sekund
- 🎨 **Custom rendering** - Elastyczne stylowanie i ikony
- ⌨️ **Keyboard support** - Arrow keys, typing, shortcuts
- 📱 **Touch-friendly** - Mobile-optimized controls
- ♿ **Accessibility** - ARIA labels, screen reader support
- 🌍 **Internationalization** - Lokalizacja i timezone support

## 🔧 Instalacja i Import

```typescript
import { TimePicker, TimeRangePicker } from '@nebula/components'

// Podstawowy time picker
function BasicTimePicker() {
  const [time, setTime] = useState('09:30')
  
  return (
    <TimePicker
      value={time}
      onChange={setTime}
      format="HH:mm"
      placeholder="Select time"
    />
  )
}
```

## 📝 Podstawowe Użycie

### 1. Meeting Scheduler

```typescript
function MeetingScheduler() {
  const [meetingData, setMeetingData] = useState({
    title: '',
    date: '',
    startTime: '09:00',
    endTime: '10:00',
    timezone: 'America/New_York',
    duration: 60
  })
  
  const [participants, setParticipants] = useState([])
  const [conflicts, setConflicts] = useState([])

  const handleTimeChange = (field, value) => {
    setMeetingData(prev => {
      const updated = { ...prev, [field]: value }
      
      // Auto-calculate end time based on duration
      if (field === 'startTime') {
        const start = new Date(`1970-01-01T${value}:00`)
        const end = new Date(start.getTime() + updated.duration * 60000)
        updated.endTime = end.toTimeString().substring(0, 5)
      }
      
      // Calculate duration when end time changes
      if (field === 'endTime') {
        const start = new Date(`1970-01-01T${updated.startTime}:00`)
        const end = new Date(`1970-01-01T${value}:00`)
        updated.duration = Math.max(0, (end - start) / 60000)
      }
      
      return updated
    })
  }

  const checkAvailability = async () => {
    try {
      const response = await fetch('/api/calendar/availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          participants: participants.map(p => p.email),
          date: meetingData.date,
          startTime: meetingData.startTime,
          endTime: meetingData.endTime,
          timezone: meetingData.timezone
        })
      })
      
      const availability = await response.json()
      setConflicts(availability.conflicts || [])
    } catch (error) {
      console.error('Failed to check availability:', error)
    }
  }

  const suggestedTimes = useMemo(() => {
    if (!meetingData.date || participants.length === 0) return []
    
    // Generate time suggestions based on participant availability
    return [
      { time: '09:00', available: 8, total: participants.length },
      { time: '10:30', available: 7, total: participants.length },
      { time: '14:00', available: 9, total: participants.length },
      { time: '15:30', available: 6, total: participants.length }
    ].sort((a, b) => b.available - a.available)
  }, [participants, meetingData.date])

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Schedule Meeting</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Meeting Details */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Title
              </label>
              <input
                type="text"
                value={meetingData.title}
                onChange={(e) => setMeetingData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter meeting title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={meetingData.date}
                onChange={(e) => setMeetingData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <TimePicker
                  value={meetingData.startTime}
                  onChange={(value) => handleTimeChange('startTime', value)}
                  format="HH:mm"
                  minuteStep={15}
                  placeholder="Start time"
                  size="large"
                  
                  // Business hours constraint
                  disabledHours={() => {
                    const hours = []
                    for (let i = 0; i < 8; i++) hours.push(i)
                    for (let i = 19; i < 24; i++) hours.push(i)
                    return hours
                  }}
                  
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <TimePicker
                  value={meetingData.endTime}
                  onChange={(value) => handleTimeChange('endTime', value)}
                  format="HH:mm"
                  minuteStep={15}
                  placeholder="End time"
                  size="large"
                  
                  // Ensure end time is after start time
                  disabledHours={() => {
                    const startHour = parseInt(meetingData.startTime.split(':')[0])
                    const hours = []
                    for (let i = 0; i < startHour; i++) hours.push(i)
                    for (let i = 20; i < 24; i++) hours.push(i)
                    return hours
                  }}
                  
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-blue-600">
                  {meetingData.duration}
                </span>
                <span className="text-gray-600">minutes</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${Math.min(meetingData.duration / 180 * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Timezone
              </label>
              <select
                value={meetingData.timezone}
                onChange={(e) => setMeetingData(prev => ({ ...prev, timezone: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="America/New_York">Eastern Time (EST/EDT)</option>
                <option value="America/Chicago">Central Time (CST/CDT)</option>
                <option value="America/Denver">Mountain Time (MST/MDT)</option>
                <option value="America/Los_Angeles">Pacific Time (PST/PDT)</option>
                <option value="Europe/London">London (GMT/BST)</option>
                <option value="Europe/Paris">Paris (CET/CEST)</option>
                <option value="Asia/Tokyo">Tokyo (JST)</option>
              </select>
            </div>

            <button
              onClick={checkAvailability}
              disabled={!meetingData.date || !meetingData.startTime}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Availability
            </button>
          </div>

          {/* Availability & Suggestions */}
          <div className="space-y-4">
            {/* Time Suggestions */}
            {suggestedTimes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Suggested Times</h3>
                <div className="space-y-2">
                  {suggestedTimes.map((suggestion, index) => (
                    <div
                      key={suggestion.time}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        meetingData.startTime === suggestion.time
                          ? 'bg-blue-100 border-blue-300'
                          : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => handleTimeChange('startTime', suggestion.time)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-lg font-medium">{suggestion.time}</div>
                          <div className="text-sm text-gray-600">
                            {suggestion.available}/{suggestion.total} available
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className={`w-3 h-3 rounded-full ${
                            suggestion.available === suggestion.total 
                              ? 'bg-green-500' 
                              : suggestion.available > suggestion.total * 0.7
                              ? 'bg-yellow-500'
                              : 'bg-red-500'
                          }`} />
                        </div>
                      </div>
                      <div className="mt-1">
                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              suggestion.available === suggestion.total
                                ? 'bg-green-500'
                                : suggestion.available > suggestion.total * 0.7
                                ? 'bg-yellow-500'
                                : 'bg-red-500'
                            }`}
                            style={{ width: `${(suggestion.available / suggestion.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conflicts Display */}
            {conflicts.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">
                  Scheduling Conflicts ({conflicts.length})
                </h3>
                <div className="space-y-2">
                  {conflicts.map((conflict, index) => (
                    <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                        <span className="font-medium">{conflict.participant}</span>
                      </div>
                      <div className="text-sm text-red-700 mt-1">
                        {conflict.conflictTitle} ({conflict.conflictTime})
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meeting Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Meeting Summary</h3>
              <div className="space-y-1 text-sm">
                <div><strong>Date:</strong> {meetingData.date}</div>
                <div><strong>Time:</strong> {meetingData.startTime} - {meetingData.endTime}</div>
                <div><strong>Duration:</strong> {meetingData.duration} minutes</div>
                <div><strong>Timezone:</strong> {meetingData.timezone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 2. Shift Management System

```typescript
function ShiftManagement() {
  const [shifts, setShifts] = useState([
    {
      id: 1,
      employee: 'Alice Johnson',
      role: 'Manager',
      date: '2024-01-15',
      startTime: '09:00',
      endTime: '17:00',
      breakTime: '12:00',
      breakDuration: 60,
      status: 'scheduled'
    },
    {
      id: 2,
      employee: 'Bob Smith',
      role: 'Cashier',
      date: '2024-01-15',
      startTime: '10:00',
      endTime: '18:00',
      breakTime: '13:30',
      breakDuration: 45,
      status: 'confirmed'
    }
  ])

  const [selectedDate, setSelectedDate] = useState('2024-01-15')
  const [shiftRules] = useState({
    minShiftLength: 4 * 60, // 4 hours
    maxShiftLength: 12 * 60, // 12 hours
    minBreak: 30, // 30 minutes
    maxBreak: 120, // 2 hours
    businessHours: {
      start: '06:00',
      end: '22:00'
    }
  })

  const calculateShiftHours = (startTime, endTime, breakDuration) => {
    const start = new Date(`1970-01-01T${startTime}:00`)
    const end = new Date(`1970-01-01T${endTime}:00`)
    const totalMinutes = (end - start) / 60000
    const workMinutes = totalMinutes - breakDuration
    return {
      total: Math.max(0, totalMinutes / 60),
      work: Math.max(0, workMinutes / 60),
      break: breakDuration / 60
    }
  }

  const validateShift = (shift) => {
    const errors = []
    const hours = calculateShiftHours(shift.startTime, shift.endTime, shift.breakDuration)
    
    if (hours.work * 60 < shiftRules.minShiftLength) {
      errors.push(`Shift too short (minimum ${shiftRules.minShiftLength / 60} hours)`)
    }
    
    if (hours.work * 60 > shiftRules.maxShiftLength) {
      errors.push(`Shift too long (maximum ${shiftRules.maxShiftLength / 60} hours)`)
    }
    
    if (shift.breakDuration < shiftRules.minBreak) {
      errors.push(`Break too short (minimum ${shiftRules.minBreak} minutes)`)
    }
    
    return errors
  }

  const updateShift = (shiftId, field, value) => {
    setShifts(prev => prev.map(shift => {
      if (shift.id !== shiftId) return shift
      
      const updated = { ...shift, [field]: value }
      
      // Auto-adjust related fields
      if (field === 'startTime' && updated.endTime <= value) {
        const start = new Date(`1970-01-01T${value}:00`)
        const end = new Date(start.getTime() + 8 * 60 * 60 * 1000) // 8 hour shift
        updated.endTime = end.toTimeString().substring(0, 5)
      }
      
      return updated
    }))
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Shift Management</h2>
            <p className="text-gray-600">Manage employee work schedules</p>
          </div>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="space-y-4">
          {shifts.filter(shift => shift.date === selectedDate).map(shift => {
            const hours = calculateShiftHours(shift.startTime, shift.endTime, shift.breakDuration)
            const errors = validateShift(shift)
            
            return (
              <div key={shift.id} className="p-4 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                  {/* Employee Info */}
                  <div className="lg:col-span-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                        {shift.employee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="font-medium">{shift.employee}</div>
                        <div className="text-sm text-gray-600">{shift.role}</div>
                      </div>
                    </div>
                  </div>

                  {/* Shift Times */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Start Time</label>
                    <TimePicker
                      value={shift.startTime}
                      onChange={(value) => updateShift(shift.id, 'startTime', value)}
                      format="HH:mm"
                      minuteStep={15}
                      size="small"
                      
                      // Business hours constraint
                      disabledHours={() => {
                        const start = parseInt(shiftRules.businessHours.start.split(':')[0])
                        const end = parseInt(shiftRules.businessHours.end.split(':')[0])
                        const disabled = []
                        for (let i = 0; i < start; i++) disabled.push(i)
                        for (let i = end; i < 24; i++) disabled.push(i)
                        return disabled
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">End Time</label>
                    <TimePicker
                      value={shift.endTime}
                      onChange={(value) => updateShift(shift.id, 'endTime', value)}
                      format="HH:mm"
                      minuteStep={15}
                      size="small"
                      
                      // Must be after start time
                      disabledHours={() => {
                        const startHour = parseInt(shift.startTime.split(':')[0])
                        const disabled = []
                        for (let i = 0; i <= startHour; i++) disabled.push(i)
                        return disabled
                      }}
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Break Time</label>
                    <TimePicker
                      value={shift.breakTime}
                      onChange={(value) => updateShift(shift.id, 'breakTime', value)}
                      format="HH:mm"
                      minuteStep={15}
                      size="small"
                      
                      // Break must be during shift
                      disabledHours={() => {
                        const startHour = parseInt(shift.startTime.split(':')[0])
                        const endHour = parseInt(shift.endTime.split(':')[0])
                        const disabled = []
                        for (let i = 0; i < startHour; i++) disabled.push(i)
                        for (let i = endHour; i < 24; i++) disabled.push(i)
                        return disabled
                      }}
                    />
                  </div>

                  {/* Hours Summary */}
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Hours</label>
                    <div className="text-sm space-y-1">
                      <div>Work: <span className="font-medium">{hours.work.toFixed(1)}h</span></div>
                      <div>Break: <span className="font-medium">{hours.break.toFixed(1)}h</span></div>
                      <div>Total: <span className="font-medium">{hours.total.toFixed(1)}h</span></div>
                    </div>
                  </div>
                </div>

                {/* Break Duration Slider */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-4">
                    <label className="text-sm text-gray-600">Break Duration:</label>
                    <input
                      type="range"
                      min={shiftRules.minBreak}
                      max={shiftRules.maxBreak}
                      step="15"
                      value={shift.breakDuration}
                      onChange={(e) => updateShift(shift.id, 'breakDuration', parseInt(e.target.value))}
                      className="flex-1"
                    />
                    <span className="text-sm font-medium w-16">
                      {shift.breakDuration}min
                    </span>
                  </div>
                </div>

                {/* Validation Errors */}
                {errors.length > 0 && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="text-sm text-red-700 space-y-1">
                      {errors.map((error, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-red-500 rounded-full" />
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Status */}
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      shift.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : shift.status === 'scheduled'
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {shift.status.charAt(0).toUpperCase() + shift.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Copy Shift
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Add New Shift */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600">
            + Add New Shift
          </button>
        </div>
      </div>
    </div>
  )
}
```

### 3. Time Range Picker for Availability

```typescript
function AvailabilityScheduler() {
  const [availability, setAvailability] = useState({
    monday: [{ start: '09:00', end: '17:00' }],
    tuesday: [{ start: '09:00', end: '17:00' }],
    wednesday: [{ start: '09:00', end: '17:00' }],
    thursday: [{ start: '09:00', end: '17:00' }],
    friday: [{ start: '09:00', end: '17:00' }],
    saturday: [],
    sunday: []
  })

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ]

  const addTimeSlot = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: [...prev[day], { start: '09:00', end: '17:00' }]
    }))
  }

  const removeTimeSlot = (day, index) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].filter((_, i) => i !== index)
    }))
  }

  const updateTimeSlot = (day, index, field, value) => {
    setAvailability(prev => ({
      ...prev,
      [day]: prev[day].map((slot, i) => 
        i === index ? { ...slot, [field]: value } : slot
      )
    }))
  }

  const copyToAllDays = (sourceDay) => {
    const sourceSlots = availability[sourceDay]
    setAvailability(prev => {
      const updated = { ...prev }
      days.forEach(day => {
        if (day.key !== sourceDay) {
          updated[day.key] = [...sourceSlots]
        }
      })
      return updated
    })
  }

  const clearDay = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: []
    }))
  }

  const getWeeklyHours = () => {
    return Object.values(availability).reduce((total, daySlots) => {
      const dayHours = daySlots.reduce((dayTotal, slot) => {
        const start = new Date(`1970-01-01T${slot.start}:00`)
        const end = new Date(`1970-01-01T${slot.end}:00`)
        return dayTotal + (end - start) / (1000 * 60 * 60)
      }, 0)
      return total + dayHours
    }, 0)
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Set Your Availability</h2>
            <p className="text-gray-600">Define when you're available to work</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {getWeeklyHours().toFixed(1)}
            </div>
            <div className="text-sm text-gray-600">hours/week</div>
          </div>
        </div>

        <div className="space-y-4">
          {days.map(day => (
            <div key={day.key} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <h3 className="text-lg font-medium">{day.label}</h3>
                  {availability[day.key].length === 0 && (
                    <span className="text-sm text-gray-500">Not available</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToAllDays(day.key)}
                    className="text-xs text-blue-600 hover:text-blue-800 px-2 py-1 border border-blue-200 rounded"
                    disabled={availability[day.key].length === 0}
                  >
                    Copy to All
                  </button>
                  <button
                    onClick={() => clearDay(day.key)}
                    className="text-xs text-red-600 hover:text-red-800 px-2 py-1 border border-red-200 rounded"
                    disabled={availability[day.key].length === 0}
                  >
                    Clear
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                {availability[day.key].map((slot, index) => (
                  <div key={index} className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TimeRangePicker
                        value={[slot.start, slot.end]}
                        onChange={([start, end]) => {
                          updateTimeSlot(day.key, index, 'start', start)
                          updateTimeSlot(day.key, index, 'end', end)
                        }}
                        format="HH:mm"
                        minuteStep={30}
                        placeholder={['Start time', 'End time']}
                        size="small"
                        
                        // Ensure reasonable work hours
                        disabledHours={(current, type) => {
                          const disabled = []
                          if (type === 'start') {
                            for (let i = 0; i < 6; i++) disabled.push(i)
                            for (let i = 23; i < 24; i++) disabled.push(i)
                          }
                          return disabled
                        }}
                      />
                    </div>

                    <div className="flex-1">
                      <div className="text-sm text-gray-600">
                        {(() => {
                          const start = new Date(`1970-01-01T${slot.start}:00`)
                          const end = new Date(`1970-01-01T${slot.end}:00`)
                          const hours = (end - start) / (1000 * 60 * 60)
                          return `${hours.toFixed(1)} hours`
                        })()}
                      </div>
                    </div>

                    <button
                      onClick={() => removeTimeSlot(day.key, index)}
                      className="text-red-500 hover:text-red-700 p-1"
                      disabled={availability[day.key].length === 1}
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => addTimeSlot(day.key)}
                  className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 text-gray-600 text-sm"
                >
                  + Add Time Slot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Weekly Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {days.map(day => {
              const dayHours = availability[day.key].reduce((total, slot) => {
                const start = new Date(`1970-01-01T${slot.start}:00`)
                const end = new Date(`1970-01-01T${slot.end}:00`)
                return total + (end - start) / (1000 * 60 * 60)
              }, 0)

              return (
                <div key={day.key} className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-600">{day.label.substring(0, 3)}</div>
                  <div className="text-lg font-semibold">
                    {dayHours > 0 ? `${dayHours.toFixed(1)}h` : 'Off'}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-4 flex justify-center">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
              Save Availability
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## 🎨 Warianty i Konfiguracja

### Time Format Options

```typescript
function TimeFormats() {
  const [times, setTimes] = useState({
    time12: '02:30 PM',
    time24: '14:30',
    withSeconds: '14:30:45',
    withMillis: '14:30:45.123'
  })

  return (
    <div className="space-y-6">
      {/* 12-hour format */}
      <TimePicker
        format="h:mm A"
        value={times.time12}
        onChange={(value) => setTimes(prev => ({ ...prev, time12: value }))}
        placeholder="12-hour format"
        use12Hours={true}
      />

      {/* 24-hour format */}
      <TimePicker
        format="HH:mm"
        value={times.time24}
        onChange={(value) => setTimes(prev => ({ ...prev, time24: value }))}
        placeholder="24-hour format"
      />

      {/* With seconds */}
      <TimePicker
        format="HH:mm:ss"
        value={times.withSeconds}
        onChange={(value) => setTimes(prev => ({ ...prev, withSeconds: value }))}
        placeholder="With seconds"
        showSecond={true}
      />

      {/* With milliseconds */}
      <TimePicker
        format="HH:mm:ss.SSS"
        value={times.withMillis}
        onChange={(value) => setTimes(prev => ({ ...prev, withMillis: value }))}
        placeholder="With milliseconds"
        showSecond={true}
        showMillisecond={true}
      />
    </div>
  )
}
```

### Step Configuration

```typescript
function StepConfiguration() {
  return (
    <div className="space-y-4">
      {/* 15-minute steps */}
      <TimePicker
        minuteStep={15}
        placeholder="15-minute intervals"
      />

      {/* 5-minute steps */}
      <TimePicker
        minuteStep={5}
        placeholder="5-minute intervals"
      />

      {/* 30-second steps */}
      <TimePicker
        minuteStep={1}
        secondStep={30}
        showSecond={true}
        placeholder="30-second intervals"
      />

      {/* Custom hour steps */}
      <TimePicker
        hourStep={2}
        minuteStep={30}
        placeholder="2-hour, 30-minute steps"
      />
    </div>
  )
}
```

### Disabled Time Ranges

```typescript
function DisabledTimes() {
  return (
    <div className="space-y-4">
      {/* Business hours only */}
      <TimePicker
        placeholder="Business hours only"
        disabledHours={() => {
          const hours = []
          for (let i = 0; i < 9; i++) hours.push(i)
          for (let i = 18; i < 24; i++) hours.push(i)
          return hours
        }}
        disabledMinutes={(hour) => {
          if (hour === 8) {
            return Array.from({ length: 30 }, (_, i) => i) // Before 8:30 AM
          }
          if (hour === 17) {
            return Array.from({ length: 60 }, (_, i) => i + 30) // After 5:30 PM
          }
          return []
        }}
      />

      {/* Lunch break excluded */}
      <TimePicker
        placeholder="No lunch break (12-1 PM)"
        disabledHours={() => []}
        disabledMinutes={(hour) => {
          if (hour === 12) {
            return Array.from({ length: 60 }, (_, i) => i) // All of 12 PM
          }
          return []
        }}
      />

      {/* Weekend hours */}
      <TimePicker
        placeholder="Weekend hours (10 AM - 6 PM)"
        disabledHours={() => {
          const hours = []
          for (let i = 0; i < 10; i++) hours.push(i)
          for (let i = 18; i < 24; i++) hours.push(i)
          return hours
        }}
      />
    </div>
  )
}
```

### Custom Rendering

```typescript
function CustomRendering() {
  return (
    <div className="space-y-6">
      {/* Custom input render */}
      <TimePicker
        inputRender={({ value, placeholder, onChange }) => (
          <div className="relative">
            <input
              value={value || ''}
              placeholder={placeholder}
              onChange={(e) => onChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg"
            />
            <ClockIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
          </div>
        )}
      />

      {/* Custom panel render */}
      <TimePicker
        panelRender={(panel) => (
          <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="text-center mb-4 text-sm font-medium text-gray-700">
              Select Time
            </div>
            {panel}
            <div className="text-center mt-4">
              <button className="text-xs text-blue-600">Current Time</button>
            </div>
          </div>
        )}
      />

      {/* Custom addon render */}
      <TimePicker
        addon={(panel) => (
          <div className="p-2 border-t flex justify-between">
            <button className="text-xs text-gray-600">Clear</button>
            <button className="text-xs text-blue-600">Now</button>
          </div>
        )}
      />
    </div>
  )
}
```

## ♿ Dostępność (Accessibility)

### ARIA Implementation

```typescript
function AccessibleTimePicker() {
  return (
    <TimePicker
      // Basic ARIA labels
      aria-label="Select meeting time"
      aria-describedby="time-help"
      
      // Role attributes
      inputProps={{
        role: 'spinbutton',
        'aria-valuemin': '00:00',
        'aria-valuemax': '23:59',
        'aria-valuenow': value,
        'aria-valuetext': `${value} (${convertTo12Hour(value)})`
      }}
      
      // Panel accessibility
      panelProps={{
        role: 'listbox',
        'aria-label': 'Time selection panel'
      }}
      
      // Hour/minute column accessibility
      columnProps={{
        hours: {
          role: 'listbox',
          'aria-label': 'Hours'
        },
        minutes: {
          role: 'listbox', 
          'aria-label': 'Minutes'
        },
        seconds: {
          role: 'listbox',
          'aria-label': 'Seconds'
        }
      }}
      
      // Keyboard navigation
      onKeyDown={(e) => {
        switch (e.key) {
          case 'ArrowUp':
            // Increase time value
            break
          case 'ArrowDown':
            // Decrease time value
            break
          case 'PageUp':
            // Increase by larger step
            break
          case 'PageDown':
            // Decrease by larger step
            break
          case 'Home':
            // Go to minimum value
            break
          case 'End':
            // Go to maximum value
            break
        }
      }}
      
      // Screen reader announcements
      onPanelChange={(visible) => {
        const message = visible 
          ? 'Time selection panel opened'
          : 'Time selection panel closed'
        announceToScreenReader(message)
      }}
      
      onChange={(value, timeString) => {
        announceToScreenReader(`Time selected: ${timeString}`)
      }}
    />
  )
}
```

### Keyboard Navigation

```typescript
function KeyboardTimePicker() {
  const [value, setValue] = useState('12:30')
  const [focusedColumn, setFocusedColumn] = useState('hours')

  const handleKeyDown = (e) => {
    const [hours, minutes] = value.split(':').map(Number)
    
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault()
        if (focusedColumn === 'hours') {
          setValue(`${String((hours + 1) % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`)
        } else {
          setValue(`${String(hours).padStart(2, '0')}:${String((minutes + 1) % 60).padStart(2, '0')}`)
        }
        break
        
      case 'ArrowDown':
        e.preventDefault()
        if (focusedColumn === 'hours') {
          setValue(`${String((hours - 1 + 24) % 24).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`)
        } else {
          setValue(`${String(hours).padStart(2, '0')}:${String((minutes - 1 + 60) % 60).padStart(2, '0')}`)
        }
        break
        
      case 'ArrowLeft':
        e.preventDefault()
        setFocusedColumn('hours')
        break
        
      case 'ArrowRight':
        e.preventDefault()
        setFocusedColumn('minutes')
        break
        
      case 'PageUp':
        e.preventDefault()
        // Increase by larger step (5 minutes or 1 hour)
        break
        
      case 'PageDown':
        e.preventDefault()
        // Decrease by larger step
        break
    }
  }

  return (
    <TimePicker
      value={value}
      onChange={setValue}
      onKeyDown={handleKeyDown}
      focusedColumn={focusedColumn}
      onColumnFocus={setFocusedColumn}
      
      // Visual focus indicators
      columnClassName={(column) => 
        column === focusedColumn ? 'focused-column' : ''
      }
    />
  )
}
```

## 🔌 Props API

### TimePickerProps

| Prop                  | Type                                         | Default         | Description               |
| --------------------- | -------------------------------------------- | --------------- | ------------------------- |
| `value`               | `string \| Date \| Moment`                   | -               | Selected time value       |
| `defaultValue`        | `string \| Date \| Moment`                   | -               | Default time value        |
| `onChange`            | `(time: string, timeString: string) => void` | -               | Time change callback      |
| `onSelect`            | `(time: string) => void`                     | -               | Time select callback      |
| `onOpenChange`        | `(open: boolean) => void`                    | -               | Panel open state change   |
| `format`              | `string`                                     | `'HH:mm'`       | Time format string        |
| `use12Hours`          | `boolean`                                    | `false`         | Use 12-hour format        |
| `showSecond`          | `boolean`                                    | `false`         | Show seconds column       |
| `showMillisecond`     | `boolean`                                    | `false`         | Show milliseconds column  |
| `hourStep`            | `number`                                     | `1`             | Hour step interval        |
| `minuteStep`          | `number`                                     | `1`             | Minute step interval      |
| `secondStep`          | `number`                                     | `1`             | Second step interval      |
| `disabledHours`       | `() => number[]`                             | -               | Disabled hours function   |
| `disabledMinutes`     | `(hour: number) => number[]`                 | -               | Disabled minutes function |
| `disabledSeconds`     | `(hour: number, minute: number) => number[]` | -               | Disabled seconds function |
| `hideDisabledOptions` | `boolean`                                    | `false`         | Hide disabled options     |
| `allowClear`          | `boolean`                                    | `true`          | Show clear button         |
| `autoFocus`           | `boolean`                                    | `false`         | Auto focus input          |
| `disabled`            | `boolean`                                    | `false`         | Whether disabled          |
| `open`                | `boolean`                                    | -               | Control panel open state  |
| `placeholder`         | `string \| string[]`                         | -               | Input placeholder         |
| `size`                | `'small' \| 'medium' \| 'large'`             | `'medium'`      | Input size                |
| `variant`             | `'outlined' \| 'filled' \| 'borderless'`     | `'outlined'`    | Input variant             |
| `suffixIcon`          | `ReactNode`                                  | `<ClockIcon />` | Custom suffix icon        |
| `clearIcon`           | `ReactNode`                                  | `<CloseIcon />` | Custom clear icon         |
| `inputRender`         | `(props: InputProps) => ReactNode`           | -               | Custom input render       |
| `panelRender`         | `(panel: ReactNode) => ReactNode`            | -               | Custom panel render       |
| `addon`               | `(panel: ReactNode) => ReactNode`            | -               | Panel addon render        |
| `popupClassName`      | `string`                                     | -               | Popup CSS class           |
| `popupStyle`          | `CSSProperties`                              | -               | Popup style               |
| `placement`           | `Placement`                                  | `'bottomLeft'`  | Popup placement           |
| `getPopupContainer`   | `(trigger: HTMLElement) => HTMLElement`      | -               | Popup container           |
| `className`           | `string`                                     | -               | CSS class name            |
| `data-testid`         | `string`                                     | -               | Test identifier           |

### TimeRangePickerProps

| Prop                            | Type                                | Default                      | Description                |
| ------------------------------- | ----------------------------------- | ---------------------------- | -------------------------- |
| `value`                         | `[string, string] \| [Date, Date]`  | -                            | Selected time range        |
| `defaultValue`                  | `[string, string] \| [Date, Date]`  | -                            | Default time range         |
| `onChange`                      | `(times: [string, string]) => void` | -                            | Range change callback      |
| `placeholder`                   | `[string, string]`                  | `['Start time', 'End time']` | Input placeholders         |
| `order`                         | `boolean`                           | `true`                       | Auto order start/end times |
| All other props from TimePicker |                                     |                              |                            |

## 🧪 Przykłady Testowania

### Unit Testing

```typescript
import { render, screen, fireEvent } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { TimePicker } from '../TimePicker'

describe('TimePicker', () => {
  test('renders time picker input', () => {
    render(<TimePicker placeholder="Select time" />)
    expect(screen.getByPlaceholderText('Select time')).toBeInTheDocument()
  })

  test('opens panel on click', async () => {
    render(<TimePicker />)
    
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    expect(screen.getByText('00')).toBeVisible() // Hours column
    expect(screen.getByText('01')).toBeVisible() // Minutes column
  })

  test('selects time value', async () => {
    const mockOnChange = jest.fn()
    render(<TimePicker onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    // Click hour 14
    fireEvent.click(screen.getByText('14'))
    
    // Click minute 30
    fireEvent.click(screen.getByText('30'))
    
    expect(mockOnChange).toHaveBeenCalledWith('14:30', '14:30')
  })

  test('keyboard navigation works', async () => {
    const mockOnChange = jest.fn()
    render(<TimePicker value="12:00" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.focus(input)
    
    // Arrow up should increase hour
    fireEvent.keyDown(input, { key: 'ArrowUp' })
    expect(mockOnChange).toHaveBeenCalledWith('13:00', '13:00')
    
    // Arrow down should decrease hour
    fireEvent.keyDown(input, { key: 'ArrowDown' })
    expect(mockOnChange).toHaveBeenCalledWith('11:00', '11:00')
  })

  test('respects disabled hours', () => {
    const disabledHours = () => [0, 1, 2, 22, 23]
    
    render(
      <TimePicker 
        disabledHours={disabledHours}
        hideDisabledOptions={true}
      />
    )
    
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    // Disabled hours should not be visible
    expect(screen.queryByText('00')).not.toBeInTheDocument()
    expect(screen.queryByText('01')).not.toBeInTheDocument()
    expect(screen.queryByText('23')).not.toBeInTheDocument()
    
    // Available hours should be visible
    expect(screen.getByText('09')).toBeInTheDocument()
    expect(screen.getByText('15')).toBeInTheDocument()
  })

  test('12-hour format works', () => {
    render(<TimePicker format="h:mm A" use12Hours={true} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    expect(screen.getByText('AM')).toBeInTheDocument()
    expect(screen.getByText('PM')).toBeInTheDocument()
  })

  test('time range picker works', async () => {
    const mockOnChange = jest.fn()
    render(
      <TimeRangePicker
        onChange={mockOnChange}
        placeholder={['Start time', 'End time']}
      />
    )
    
    const [startInput, endInput] = screen.getAllByRole('textbox')
    
    // Set start time
    fireEvent.click(startInput)
    fireEvent.click(screen.getByText('09'))
    fireEvent.click(screen.getByText('30'))
    
    // Set end time
    fireEvent.click(endInput)
    fireEvent.click(screen.getByText('17'))
    fireEvent.click(screen.getByText('00'))
    
    expect(mockOnChange).toHaveBeenCalledWith(['09:30', '17:00'])
  })
})
```

### Integration Testing

```typescript
describe('TimePicker Integration', () => {
  test('integrates with form validation', async () => {
    const FormWithTimePicker = () => {
      const [time, setTime] = useState('')
      const [error, setError] = useState('')

      const validateTime = (value) => {
        const [hours] = value.split(':').map(Number)
        if (hours < 9 || hours > 17) {
          setError('Time must be between 9 AM and 5 PM')
        } else {
          setError('')
        }
      }

      return (
        <form>
          <TimePicker
            value={time}
            onChange={(value) => {
              setTime(value)
              validateTime(value)
            }}
            placeholder="Select time"
          />
          {error && <div data-testid="error">{error}</div>}
        </form>
      )
    }

    render(<FormWithTimePicker />)
    
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    // Select invalid time (before 9 AM)
    fireEvent.click(screen.getByText('08'))
    fireEvent.click(screen.getByText('00'))
    
    expect(screen.getByTestId('error')).toHaveTextContent(
      'Time must be between 9 AM and 5 PM'
    )
  })

  test('works with external time libraries', () => {
    const MomentTimePicker = () => {
      const [time, setTime] = useState(null)

      return (
        <div>
          <TimePicker
            value={time}
            onChange={setTime}
            format="HH:mm"
          />
          <div data-testid="formatted-time">
            {time && moment(time, 'HH:mm').format('h:mm A')}
          </div>
        </div>
      )
    }

    render(<MomentTimePicker />)
    
    const input = screen.getByRole('textbox')
    fireEvent.click(input)
    
    fireEvent.click(screen.getByText('14'))
    fireEvent.click(screen.getByText('30'))
    
    expect(screen.getByTestId('formatted-time')).toHaveTextContent('2:30 PM')
  })
})
```

## 📚 Najlepsze Praktyki

### 1. **Time Validation**
```typescript
function ValidatedTimePicker() {
  const validateBusinessHours = (time) => {
    const [hours, minutes] = time.split(':').map(Number)
    const totalMinutes = hours * 60 + minutes
    return totalMinutes >= 9 * 60 && totalMinutes <= 17 * 60
  }

  const validateTimeRange = (start, end) => {
    const startTime = new Date(`1970-01-01T${start}:00`)
    const endTime = new Date(`1970-01-01T${end}:00`)
    return endTime > startTime
  }

  return (
    <TimePicker
      onChange={(value) => {
        if (!validateBusinessHours(value)) {
          showError('Time must be during business hours')
        }
      }}
    />
  )
}
```

### 2. **Performance Optimization**
```typescript
// Memoize disabled time calculations
const disabledHours = useMemo(() => {
  return () => businessHours.getDisabledHours()
}, [businessHours])

// Use callback for change handlers
const handleTimeChange = useCallback((time) => {
  updateSchedule(time)
}, [updateSchedule])
```

### 3. **Accessibility Best Practices**
```typescript
<TimePicker
  aria-label="Meeting start time"
  aria-describedby="time-help"
  inputProps={{
    'aria-required': 'true',
    'aria-invalid': hasError
  }}
/>
```

TimePicker component oferuje kompletne rozwiązanie do wybierania czasu z zaawansowanymi funkcjami, walidacją i pełnym wsparciem dostępności.
