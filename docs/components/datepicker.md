# DatePicker Component Documentation

## Overview
The DatePicker component provides an intuitive date selection interface with a comprehensive calendar view, validation capabilities, and flexible configuration options. Perfect for forms, scheduling, and any application requiring date input.

## Features
- **Calendar Interface**: Interactive calendar with month/year navigation
- **Date Range Selection**: Support for single dates and date ranges
- **Size Variants**: Small (sm), Medium (md), and Large (lg) sizes
- **Input Integration**: Text input with date formatting and validation
- **Localization**: Support for different locales and date formats
- **Min/Max Dates**: Date range restrictions and validation
- **Disabled Dates**: Custom date disable functionality
- **Validation States**: Error, success, and warning states with visual feedback
- **Accessibility**: Full ARIA compliance with keyboard navigation
- **Dark Mode**: Complete dark theme compatibility
- **Custom Formatting**: Flexible date display and input formats

## Basic Usage

### Simple DatePicker
```typescript
import { DatePicker } from '@nebula/components'

function SimpleDatePicker() {
  return (
    <DatePicker
      label="Select Date"
      placeholder="Choose a date..."
    />
  )
}
```

### Controlled DatePicker
```typescript
import { DatePicker } from '@nebula/components'
import { useState } from 'preact/hooks'

function ControlledDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  
  return (
    <DatePicker
      value={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      label="Appointment Date"
      placeholder="Select appointment date..."
    />
  )
}
```

### With Default Value
```typescript
import { DatePicker } from '@nebula/components'

function DefaultDatePicker() {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  return (
    <DatePicker
      defaultValue={tomorrow}
      label="Delivery Date"
      placeholder="Select delivery date..."
    />
  )
}
```

## Sizes
The DatePicker component supports three sizes:

```typescript
<DatePicker size="sm" label="Small DatePicker" />
<DatePicker size="md" label="Medium DatePicker" />
<DatePicker size="lg" label="Large DatePicker" />
```

## Date Formatting

### Custom Date Format
```typescript
import { DatePicker } from '@nebula/components'

function FormattedDatePicker() {
  return (
    <DatePicker
      label="Event Date"
      format="MM/dd/yyyy"
      placeholder="MM/DD/YYYY"
    />
  )
}
```

### Localized DatePicker
```typescript
import { DatePicker } from '@nebula/components'

function LocalizedDatePicker() {
  return (
    <div className="space-y-4">
      <DatePicker
        label="US Format"
        format="MM/dd/yyyy"
        locale="en-US"
        placeholder="MM/DD/YYYY"
      />
      <DatePicker
        label="European Format"
        format="dd/MM/yyyy"
        locale="en-GB"
        placeholder="DD/MM/YYYY"
      />
      <DatePicker
        label="ISO Format"
        format="yyyy-MM-dd"
        locale="en-ISO"
        placeholder="YYYY-MM-DD"
      />
    </div>
  )
}
```

## Date Validation

### Min/Max Dates
```typescript
import { DatePicker } from '@nebula/components'

function ValidatedDatePicker() {
  const today = new Date()
  const minDate = new Date()
  const maxDate = new Date()
  
  minDate.setDate(today.getDate() - 7) // 7 days ago
  maxDate.setDate(today.getDate() + 30) // 30 days from now
  
  return (
    <DatePicker
      label="Available Dates"
      minDate={minDate}
      maxDate={maxDate}
      placeholder="Select within range..."
      helperText="Available from last week to next month"
    />
  )
}
```

### Disabled Dates
```typescript
import { DatePicker } from '@nebula/components'

function DisabledDatesExample() {
  // Disable weekends
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6 // Sunday = 0, Saturday = 6
  }
  
  // Disable specific dates
  const holidays = [
    new Date('2024-12-25'), // Christmas
    new Date('2024-01-01'), // New Year
    new Date('2024-07-04')  // Independence Day
  ]
  
  const isHoliday = (date: Date) => {
    return holidays.some(holiday => 
      holiday.toDateString() === date.toDateString()
    )
  }
  
  const isDisabled = (date: Date) => {
    return isWeekend(date) || isHoliday(date)
  }
  
  return (
    <DatePicker
      label="Business Days Only"
      isDateDisabled={isDisabled}
      placeholder="Weekdays only..."
      helperText="Weekends and holidays are disabled"
    />
  )
}
```

### Required Validation
```typescript
import { DatePicker, Button } from '@nebula/components'
import { useState } from 'preact/hooks'

function RequiredDatePicker() {
  const [birthDate, setBirthDate] = useState<Date | null>(null)
  const [error, setError] = useState('')
  
  const handleSubmit = () => {
    if (!birthDate) {
      setError('Birth date is required')
      return
    }
    
    if (birthDate > new Date()) {
      setError('Birth date cannot be in the future')
      return
    }
    
    setError('')
    console.log('Valid birth date:', birthDate)
  }
  
  return (
    <div className="space-y-4">
      <DatePicker
        value={birthDate}
        onChange={(date) => {
          setBirthDate(date)
          setError('')
        }}
        label="Birth Date"
        required
        error={!!error}
        helperText={error || 'Enter your birth date'}
        maxDate={new Date()}
        placeholder="Select birth date..."
      />
      <Button onClick={handleSubmit}>
        Submit
      </Button>
    </div>
  )
}
```

## Date Range Selection

### Date Range Picker
```typescript
import { DatePicker } from '@nebula/components'
import { useState } from 'preact/hooks'

interface DateRange {
  startDate: Date | null
  endDate: Date | null
}

function DateRangePicker() {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: null,
    endDate: null
  })
  
  const handleStartDateChange = (date: Date | null) => {
    setDateRange(prev => ({ 
      ...prev, 
      startDate: date,
      // Clear end date if it's before new start date
      endDate: date && prev.endDate && prev.endDate < date ? null : prev.endDate
    }))
  }
  
  const handleEndDateChange = (date: Date | null) => {
    setDateRange(prev => ({ ...prev, endDate: date }))
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DatePicker
        value={dateRange.startDate}
        onChange={handleStartDateChange}
        label="Start Date"
        placeholder="Select start date..."
        maxDate={dateRange.endDate || undefined}
      />
      <DatePicker
        value={dateRange.endDate}
        onChange={handleEndDateChange}
        label="End Date"
        placeholder="Select end date..."
        minDate={dateRange.startDate || undefined}
        disabled={!dateRange.startDate}
      />
    </div>
  )
}
```

### Vacation Booking
```typescript
import { DatePicker, Button, Card, Alert } from '@nebula/components'
import { useState } from 'preact/hooks'

interface VacationBooking {
  checkIn: Date | null
  checkOut: Date | null
  guests: number
}

function VacationBooking() {
  const [booking, setBooking] = useState<VacationBooking>({
    checkIn: null,
    checkOut: null,
    guests: 1
  })
  
  const [isSearching, setIsSearching] = useState(false)
  
  const today = new Date()
  const minDate = new Date()
  minDate.setDate(today.getDate() + 1) // Tomorrow
  
  const calculateNights = () => {
    if (!booking.checkIn || !booking.checkOut) return 0
    const diffTime = booking.checkOut.getTime() - booking.checkIn.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  
  const handleSearch = async () => {
    if (!booking.checkIn || !booking.checkOut) return
    
    setIsSearching(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSearching(false)
    console.log('Searching for accommodations:', booking)
  }
  
  const nights = calculateNights()
  const isValidBooking = booking.checkIn && booking.checkOut && nights > 0
  
  return (
    <Card className="max-w-2xl">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-6">Book Your Stay</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <DatePicker
            value={booking.checkIn}
            onChange={(date) => setBooking(prev => ({ 
              ...prev, 
              checkIn: date,
              // Clear checkout if it's not after check-in
              checkOut: date && prev.checkOut && prev.checkOut <= date ? null : prev.checkOut
            }))}
            label="Check-in Date"
            placeholder="Select check-in..."
            minDate={minDate}
            required
          />
          <DatePicker
            value={booking.checkOut}
            onChange={(date) => setBooking(prev => ({ ...prev, checkOut: date }))}
            label="Check-out Date"
            placeholder="Select check-out..."
            minDate={booking.checkIn ? new Date(booking.checkIn.getTime() + 86400000) : minDate}
            disabled={!booking.checkIn}
            required
          />
        </div>
        
        {isValidBooking && (
          <Alert variant="info" className="mb-4">
            <div className="flex items-center justify-between">
              <span>
                {nights} {nights === 1 ? 'night' : 'nights'} selected
              </span>
              <span className="text-sm text-gray-600">
                {booking.checkIn?.toLocaleDateString()} - {booking.checkOut?.toLocaleDateString()}
              </span>
            </div>
          </Alert>
        )}
        
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">Guests</label>
          <select 
            value={booking.guests}
            onChange={(e) => setBooking(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {Array.from({ length: 8 }, (_, i) => i + 1).map(num => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
        
        <Button 
          onClick={handleSearch}
          disabled={!isValidBooking || isSearching}
          loading={isSearching}
          className="w-full"
        >
          {isSearching ? 'Searching...' : 'Search Accommodations'}
        </Button>
      </div>
    </Card>
  )
}
```

## Advanced Features

### Custom Calendar Header
```typescript
import { DatePicker } from '@nebula/components'
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-preact'

function CustomHeaderDatePicker() {
  const renderCalendarHeader = ({ 
    currentMonth, 
    currentYear, 
    goToPrevMonth, 
    goToNextMonth,
    goToToday 
  }: any) => (
    <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950">
      <button
        onClick={goToPrevMonth}
        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <div className="flex items-center gap-2">
        <Calendar className="w-4 h-4" />
        <span className="font-semibold">
          {currentMonth} {currentYear}
        </span>
      </div>
      
      <button
        onClick={goToNextMonth}
        className="p-2 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-lg"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
  
  return (
    <DatePicker
      label="Custom Header"
      renderHeader={renderCalendarHeader}
      placeholder="Select date with custom header..."
    />
  )
}
```

### Time Selection
```typescript
import { DatePicker } from '@nebula/components'
import { useState } from 'preact/hooks'

function DateTimePicker() {
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null)
  
  return (
    <DatePicker
      value={selectedDateTime}
      onChange={setSelectedDateTime}
      label="Appointment Date & Time"
      placeholder="Select date and time..."
      showTime
      timeFormat="HH:mm"
      format="MM/dd/yyyy HH:mm"
      minuteStep={15}
    />
  )
}
```

### Multiple Date Selection
```typescript
import { DatePicker } from '@nebula/components'
import { useState } from 'preact/hooks'

function MultipleDatePicker() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  
  const handleDateSelect = (date: Date) => {
    setSelectedDates(prev => {
      const exists = prev.find(d => d.toDateString() === date.toDateString())
      if (exists) {
        return prev.filter(d => d.toDateString() !== date.toDateString())
      } else {
        return [...prev, date].sort((a, b) => a.getTime() - b.getTime())
      }
    })
  }
  
  return (
    <div className="space-y-4">
      <DatePicker
        multiple
        selectedDates={selectedDates}
        onDateSelect={handleDateSelect}
        label="Meeting Dates"
        placeholder="Select multiple meeting dates..."
        helperText={`${selectedDates.length} dates selected`}
      />
      
      {selectedDates.length > 0 && (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h4 className="font-medium mb-2">Selected Dates:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedDates.map((date, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {date.toLocaleDateString()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

## Form Integration

### Event Creation Form
```typescript
import { DatePicker, Input, Textarea, Button, Card, Select } from '@nebula/components'
import { useState } from 'preact/hooks'

interface EventForm {
  title: string
  description: string
  startDate: Date | null
  endDate: Date | null
  location: string
  category: string
  isAllDay: boolean
}

function EventCreationForm() {
  const [formData, setFormData] = useState<EventForm>({
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    location: '',
    category: '',
    isAllDay: false
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const categories = [
    { value: 'meeting', label: 'Meeting' },
    { value: 'conference', label: 'Conference' },
    { value: 'workshop', label: 'Workshop' },
    { value: 'social', label: 'Social Event' },
    { value: 'personal', label: 'Personal' }
  ]
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) {
      newErrors.title = 'Event title is required'
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required'
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required'
    } else if (formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = 'End date must be after start date'
    }
    
    if (!formData.category) {
      newErrors.category = 'Category is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleSubmit = (e: Event) => {
    e.preventDefault()
    
    if (validateForm()) {
      console.log('Event created:', formData)
      // Reset form
      setFormData({
        title: '',
        description: '',
        startDate: null,
        endDate: null,
        location: '',
        category: '',
        isAllDay: false
      })
    }
  }
  
  return (
    <Card className="max-w-2xl">
      <form onSubmit={handleSubmit} className="p-6">
        <h3 className="text-lg font-semibold mb-6">Create New Event</h3>
        
        <div className="space-y-4">
          <Input
            label="Event Title"
            value={formData.title}
            onChange={(value) => setFormData(prev => ({ ...prev, title: value }))}
            error={!!errors.title}
            helperText={errors.title}
            placeholder="Enter event title..."
            required
          />
          
          <Textarea
            label="Description"
            value={formData.description}
            onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
            placeholder="Describe the event..."
            rows={3}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DatePicker
              value={formData.startDate}
              onChange={(date) => setFormData(prev => ({ 
                ...prev, 
                startDate: date,
                endDate: date && prev.endDate && prev.endDate < date ? date : prev.endDate
              }))}
              label="Start Date"
              placeholder="Select start date..."
              error={!!errors.startDate}
              helperText={errors.startDate}
              minDate={new Date()}
              showTime={!formData.isAllDay}
              required
            />
            
            <DatePicker
              value={formData.endDate}
              onChange={(date) => setFormData(prev => ({ ...prev, endDate: date }))}
              label="End Date"
              placeholder="Select end date..."
              error={!!errors.endDate}
              helperText={errors.endDate}
              minDate={formData.startDate || new Date()}
              showTime={!formData.isAllDay}
              required
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="allDay"
              checked={formData.isAllDay}
              onChange={(e) => setFormData(prev => ({ ...prev, isAllDay: e.target.checked }))}
              className="rounded"
            />
            <label htmlFor="allDay" className="text-sm">
              All day event
            </label>
          </div>
          
          <Input
            label="Location"
            value={formData.location}
            onChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
            placeholder="Enter event location..."
          />
          
          <Select
            options={categories}
            value={formData.category}
            onChange={(value) => setFormData(prev => ({ ...prev, category: value as string }))}
            label="Category"
            placeholder="Select category..."
            error={!!errors.category}
            helperText={errors.category}
            required
          />
          
          <div className="pt-4">
            <Button type="submit" className="w-full">
              Create Event
            </Button>
          </div>
        </div>
      </form>
    </Card>
  )
}
```

## Props Reference

### DatePicker Props
| Prop                | Type                                              | Default        | Description                           |
| ------------------- | ------------------------------------------------- | -------------- | ------------------------------------- |
| `value`             | `Date \| null`                                    | -              | Selected date value                   |
| `defaultValue`      | `Date \| null`                                    | -              | Default selected date                 |
| `onChange`          | `(date: Date \| null) => void`                    | -              | Date change handler                   |
| `onCalendarOpen`    | `() => void`                                      | -              | Calendar open handler                 |
| `onCalendarClose`   | `() => void`                                      | -              | Calendar close handler                |
| `format`            | `string`                                          | `'MM/dd/yyyy'` | Date display format                   |
| `placeholder`       | `string`                                          | -              | Input placeholder text                |
| `label`             | `string`                                          | -              | Field label                           |
| `helperText`        | `string`                                          | -              | Helper or error text                  |
| `disabled`          | `boolean`                                         | `false`        | Disable the component                 |
| `error`             | `boolean`                                         | `false`        | Show error state                      |
| `success`           | `boolean`                                         | `false`        | Show success state                    |
| `warning`           | `boolean`                                         | `false`        | Show warning state                    |
| `required`          | `boolean`                                         | `false`        | Mark field as required                |
| `size`              | `'sm' \| 'md' \| 'lg'`                            | `'md'`         | Size variant                          |
| `minDate`           | `Date`                                            | -              | Minimum selectable date               |
| `maxDate`           | `Date`                                            | -              | Maximum selectable date               |
| `isDateDisabled`    | `(date: Date) => boolean`                         | -              | Custom date disable function          |
| `showTime`          | `boolean`                                         | `false`        | Enable time selection                 |
| `timeFormat`        | `string`                                          | `'HH:mm'`      | Time display format                   |
| `minuteStep`        | `number`                                          | `1`            | Minute selection step                 |
| `locale`            | `string`                                          | `'en-US'`      | Locale for formatting                 |
| `showWeekNumbers`   | `boolean`                                         | `false`        | Show week numbers                     |
| `firstDayOfWeek`    | `0 \| 1 \| 2 \| 3 \| 4 \| 5 \| 6`                 | `0`            | First day of week (0 = Sunday)        |
| `multiple`          | `boolean`                                         | `false`        | Enable multiple date selection        |
| `selectedDates`     | `Date[]`                                          | -              | Selected dates for multiple selection |
| `onDateSelect`      | `(date: Date) => void`                            | -              | Date select handler for multiple      |
| `renderHeader`      | `(props: HeaderProps) => ComponentChild`          | -              | Custom header renderer                |
| `renderDay`         | `(date: Date, props: DayProps) => ComponentChild` | -              | Custom day renderer                   |
| `className`         | `string`                                          | -              | Additional CSS classes                |
| `calendarClassName` | `string`                                          | -              | Calendar container classes            |
| `inputClassName`    | `string`                                          | -              | Input field classes                   |

### Calendar Props
| Prop              | Type                      | Default      | Description                     |
| ----------------- | ------------------------- | ------------ | ------------------------------- |
| `currentDate`     | `Date`                    | `new Date()` | Currently displayed month/year  |
| `selectedDate`    | `Date \| null`            | -            | Selected date                   |
| `onDateSelect`    | `(date: Date) => void`    | -            | Date selection handler          |
| `onMonthChange`   | `(date: Date) => void`    | -            | Month change handler            |
| `minDate`         | `Date`                    | -            | Minimum selectable date         |
| `maxDate`         | `Date`                    | -            | Maximum selectable date         |
| `isDateDisabled`  | `(date: Date) => boolean` | -            | Date disable function           |
| `highlightToday`  | `boolean`                 | `true`       | Highlight current date          |
| `showOtherMonths` | `boolean`                 | `true`       | Show dates from adjacent months |

## Accessibility
The DatePicker component provides comprehensive accessibility support:

- **ARIA Compliance**: Uses proper `combobox` role with calendar popup
- **Keyboard Navigation**: Arrow keys for calendar navigation, Enter/Space for selection
- **Screen Readers**: Clear announcements of dates and calendar state
- **Focus Management**: Proper focus indicators and focus trapping in calendar
- **High Contrast**: Support for high contrast mode
- **Label Association**: Automatic label-input association
- **Date Announcements**: Clear indication of selected dates and navigation

## Examples

### Appointment Scheduler
```typescript
import { DatePicker, Select, Button, Card } from '@nebula/components'
import { useState } from 'preact/hooks'

interface Appointment {
  date: Date | null
  time: string
  duration: string
  type: string
}

function AppointmentScheduler() {
  const [appointment, setAppointment] = useState<Appointment>({
    date: null,
    time: '',
    duration: '30',
    type: 'consultation'
  })
  
  const timeSlots = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ]
  
  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'check-up', label: 'Check-up' },
    { value: 'treatment', label: 'Treatment' }
  ]
  
  const durations = [
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' }
  ]
  
  const isWeekend = (date: Date) => {
    const day = date.getDay()
    return day === 0 || day === 6
  }
  
  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3) // 3 months ahead
  
  return (
    <Card className="max-w-lg">
      <div className="p-6">
        <h3 className="text-lg font-semibold mb-6">Schedule Appointment</h3>
        
        <div className="space-y-4">
          <DatePicker
            value={appointment.date}
            onChange={(date) => setAppointment(prev => ({ ...prev, date }))}
            label="Appointment Date"
            placeholder="Select date..."
            minDate={today}
            maxDate={maxDate}
            isDateDisabled={isWeekend}
            helperText="Weekends are not available"
            required
          />
          
          <Select
            options={timeSlots}
            value={appointment.time}
            onChange={(time) => setAppointment(prev => ({ ...prev, time: time as string }))}
            label="Time Slot"
            placeholder="Select time..."
            disabled={!appointment.date}
            required
          />
          
          <Select
            options={durations}
            value={appointment.duration}
            onChange={(duration) => setAppointment(prev => ({ ...prev, duration: duration as string }))}
            label="Duration"
            placeholder="Select duration..."
            required
          />
          
          <Select
            options={appointmentTypes}
            value={appointment.type}
            onChange={(type) => setAppointment(prev => ({ ...prev, type: type as string }))}
            label="Appointment Type"
            placeholder="Select type..."
            required
          />
          
          <Button 
            className="w-full mt-6"
            disabled={!appointment.date || !appointment.time}
          >
            Book Appointment
          </Button>
        </div>
      </div>
    </Card>
  )
}
```
