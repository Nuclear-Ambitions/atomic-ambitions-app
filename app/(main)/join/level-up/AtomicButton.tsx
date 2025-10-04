interface AtomicButtonProps {
  label: string
  onClick: () => void
}

const AtomicButton: React.FC<AtomicButtonProps> = ({
  label = 'Do It',
  onClick,
}) => {
  return (
    <div className='text-center'>
      <button className='btn btn-primary' id='levelUp' onClick={onClick}>
        {label}
      </button>
    </div>
  )
}

export default AtomicButton
