/**
 * ProgressBar — thin animated bar at the top showing overall completion %.
 * @param {{ progress: number, isComplete: boolean }} props
 */
export default function ProgressBar({ progress, isComplete }) {
  return (
    <div className="progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
      <div
        className={`progress-fill ${isComplete ? "progress-complete" : ""}`}
        style={{ width: `${progress}%` }}
      />
      <span className="progress-label">{Math.round(progress)}%</span>
    </div>
  );
}
