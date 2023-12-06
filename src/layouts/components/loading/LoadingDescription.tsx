
const LoadingDescription = () => {
	return (
		<div>
			<div className="border-b-2 flex gap-x-6">
				<div
					className={`w-[10%] border-t-2 border-l-2 border-r-2 border-b-0 animate-pulse bg-neutral-200 dark:bg-neutral-700 px-6 rounded-tl-md rounded-tr-md h-8`} />
				<div
					className={`w-[10%] border-t-2 border-l-2 border-r-2 border-b-0 animate-pulse bg-neutral-200 dark:bg-neutral-700 px-6 rounded-tl-md rounded-tr-md h-8`} />
			</div>
			<div className="border-l-2 border-r-2 border-b-2 rounded-bl-md rounded-br-md p-6">
				<div className="h-10 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
				<div>
					<div className="h-10 mb-4 rounded-md animate-pulse bg-neutral-200 dark:bg-neutral-700" />
				</div>
			</div>
		</div>
	)
}

export default LoadingDescription