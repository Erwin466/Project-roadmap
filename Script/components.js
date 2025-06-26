// Simple UI component system for modals, notifications, loading, progress, forms
export function Modal({ title, content, onClose }) {
    // ...create and show modal...
}

export function Notification({ message, type }) {
    // ...create and show notification...
}

export function LoadingSpinner() {
    // ...return loading spinner element...
}

export function ProgressBar({ value, max }) {
    // ...return progress bar element...
}

export function FormField({ label, type, value, onInput }) {
    // ...return form field with label and ARIA attributes...
}

export function GamificationBadge({ badge, unlocked }) {
    // ...return badge element...
}

export function CourseCard({ course }) {
    // ...return course card element...
}

export function SocialButton({ type, onClick }) {
    // ...return like/share/follow button...
}
// ...other reusable components...
