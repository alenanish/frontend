import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@radix-ui/react-hover-card'

const ErrorDisplay = ({message} : {message: string}) => {
    return (
        <div className='text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-destructive p-0 m-0'>
           {message}
        </div>
    )
}

export default ErrorDisplay
