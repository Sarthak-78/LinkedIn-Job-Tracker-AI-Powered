const { spawn } = require('child_process');
const http = require('http');

console.log('🚀 Starting Day 1 Tests...');

const env = { ...process.env, USE_MEMORY_DB: 'true', PORT: '5001' };
// Assuming server.js is in the same directory
const server = spawn('node', ['server.js'], { env, cwd: __dirname });

let testsStarted = false;

server.stdout.on('data', (data) => {
    const output = data.toString();
    console.log(`[Server]: ${output.trim()}`);
    if (output.includes('Server running') && !testsStarted) {
        testsStarted = true;
        // Give it a moment to stabilize
        setTimeout(runTests, 1000);
    }
});

server.stderr.on('data', (data) => console.error(`[Server Error]: ${data}`));

function runTests() {
    const data = JSON.stringify({
        role: "Backend Developer",
        skills: ["Node.js", "Express", "MongoDB"],
        maxExperience: 2,
        locations: ["Remote", "Bangalore"]
    });

    const options = {
        hostname: 'localhost',
        port: 5001,
        path: '/preferences',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    console.log('🧪 Testing POST /preferences...');
    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`POST Response: ${res.statusCode}`);
            if (res.statusCode === 201 || res.statusCode === 200) {
                // 201 Created is expected
                console.log('POST Body:', body);
                testGet();
            } else {
                console.log('POST Body:', body);
                cleanup(1);
            }
        });
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
        cleanup(1);
    });

    req.write(data);
    req.end();
}

function testGet() {
    console.log('🧪 Testing GET /preferences...');
    http.get('http://localhost:5001/preferences', (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            console.log(`GET Response: ${res.statusCode}`);
            console.log('GET Body:', body);

            // Basic validation
            if (body.includes("Backend Developer")) {
                cleanup(0);
            } else {
                console.error("GET response did not contain expected data.");
                cleanup(1);
            }
        });
    }).on('error', (e) => {
        console.error(`Problem with GET: ${e.message}`);
        cleanup(1);
    });
}

function cleanup(code) {
    server.kill();
    console.log(code === 0 ? '✅ DAY 1 CHECKS PASSED' : '❌ TESTS FAILED');
    process.exit(code);
}
