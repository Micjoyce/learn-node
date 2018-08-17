const startUsage = process.cpuUsage();

const now = Date.now();

while(Date.now() - now < 500) {
    console.log(process.cpuUsage(startUsage));
}