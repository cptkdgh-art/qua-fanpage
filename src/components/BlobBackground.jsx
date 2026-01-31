export default function BlobBackground() {
  const blobs = [
    { color: '#ffc9dc', size: '600px', top: '10%', left: '10%', delay: '0s' },
    { color: '#ccfbf1', size: '500px', top: '60%', right: '15%', delay: '5s' },
    { color: '#e9d5ff', size: '550px', bottom: '10%', left: '50%', delay: '10s' },
  ]

  return (
    <div className="blob-background">
      {blobs.map((blob, index) => (
        <div
          key={index}
          className="blob"
          style={{
            background: blob.color,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            bottom: blob.bottom,
            left: blob.left,
            right: blob.right,
            animationDelay: blob.delay,
          }}
        />
      ))}
    </div>
  )
}
