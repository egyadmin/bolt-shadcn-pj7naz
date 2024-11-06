import { Line, LineChart, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  {
    attendance: 234,
    leaves: 12,
    week: 'Week 1',
  },
  {
    attendance: 238,
    leaves: 8,
    week: 'Week 2',
  },
  {
    attendance: 240,
    leaves: 5,
    week: 'Week 3',
  },
  {
    attendance: 235,
    leaves: 10,
    week: 'Week 4',
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="rounded-lg border bg-background p-2 shadow-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Attendance
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[0].value}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[0.70rem] uppercase text-muted-foreground">
                        Leaves
                      </span>
                      <span className="font-bold text-muted-foreground">
                        {payload[1].value}
                      </span>
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="attendance"
          style={{ stroke: 'hsl(var(--primary))' }}
        />
        <Line
          type="monotone"
          strokeWidth={2}
          dataKey="leaves"
          style={{ stroke: 'hsl(var(--muted-foreground))' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}