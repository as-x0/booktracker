interface PageProgressProps {
    current: number;
    total: number;
}

function PageProgress({
                          current,
                          total
                      }: PageProgressProps) {

    const percentage =
        total > 0
            ? Math.min((current / total) * 100, 100)
            : 0;

    return (
        <div>
            <p>
                {current} / {total} pages
            </p>

            <progress
                value={percentage}
                max="100"
            />
        </div>
    );
}

export default PageProgress;