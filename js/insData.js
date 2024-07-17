const insData = [
    { 
        timestamp: '2024-07-10T12:35:19Z',
        coordinates: { latitude: 40.7128, longitude: -74.0060, altitude: 0 },
        gyro: { x: 0.00, y: 0.00, z: 0.00 },
        accel: { x: 0.1, y: -0.2, z: 0.3 },
        
    },
    { 
        timestamp: '2024-07-10T12:35:50Z',
        coordinates: { latitude: 60.7128, longitude: -75.0060, altitude: 1000 },
        gyro: { x: 0.5, y: 0.5, z: 12.5 },
        accel: { x: 0.2, y: -0.1, z: 0.4 },
           
    },
    {         
        timestamp: '2024-07-10T12:35:51Z',
        coordinates: { latitude: 51.5074, longitude: -0.1278, altitude: 500 },
        gyro: { x: 0.03, y: 10.04, z: 0.05 },
        accel: { x: 0.3, y: 0.0, z: 0.5 },
      
    },
    {        
        timestamp: '2024-07-10T12:38:19Z',
        coordinates: { latitude: 48.8566, longitude: 2.3522, altitude: 2000 },
        gyro: { x: 10.04, y: 0.05, z: 0.06 },
        accel: { x: 0.4, y: 0.1, z: 0.6 },
        
    },
    {        
        timestamp: '2024-07-10T12:39:19Z',
        coordinates: { latitude: 55.7558, longitude: 37.6176, altitude: 1500 },
        gyro: { x: 0.05, y: 0.06, z: 10.07 },
        accel: { x: 0.5, y: 0.2, z: 0.7 },
        
    },
    {         
        timestamp: '2024-07-10T12:40:19Z',
        coordinates: { latitude: 35.6895, longitude: 139.6917, altitude: 2500 },
        gyro: { x: 0.06, y: 10.07, z: 0.08 },
        accel: { x: 0.6, y: 0.3, z: 0.8 },
      
    },
    {        
        timestamp: '2024-07-10T12:41:19Z',
        coordinates: { latitude: -33.8651, longitude: 151.2099, altitude: 3000 },
        gyro: { x: 10.07, y: 0.08, z: 0.09 },
        accel: { x: 0.7, y: 0.4, z: 0.9 },
        
    },
    {        
        timestamp: '2024-07-10T12:42:19Z',
        coordinates: { latitude: -22.9068, longitude: -43.1729, altitude: 2000 },
        gyro: { x: 0.08, y: 0.09, z: 0.10 },
        accel: { x: 0.8, y: 0.5, z: 1.0 },
       
    },
    {        
        timestamp: '2024-07-10T12:43:19Z',
        coordinates: { latitude: -33.4489, longitude: -70.6693, altitude: 1000 },
        gyro: { x: 0.09, y: 12.10, z: 0.11 },
        accel: { x: 0.9, y: 0.6, z: 1.1 },
        
    },
    {         
        timestamp: '2024-07-10T12:44:19Z',
        coordinates: { latitude: 40.7306, longitude: -73.9352, altitude: 500 },
        gyro: { x: 0.10, y: 0.11, z: 0.12 },
        accel: { x: 1.0, y: 0.7, z: 1.2 },
        
    },
    {        
        timestamp: '2024-07-10T12:45:19Z',
        coordinates: { latitude: 34.0522, longitude: -118.2437, altitude: 1500 },
        gyro: { x: 0.11, y: 12.12, z: 0.13 },
        accel: { x: 1.1, y: 0.8, z: 1.3 },
       
    },
    {        
        timestamp: '2024-07-10T12:46:19Z',
        coordinates: { latitude: 37.3382, longitude: -121.8863, altitude: 2000 },
        gyro: { x: 0.12, y: 0.13, z: 10.14 },
        accel: { x: 1.2, y: 0.9, z: 1.4 },
       
    },
    {         
        timestamp: '2024-07-10T12:47:19Z',
        coordinates: { latitude: 51.1657, longitude: 10.4515, altitude: 2500 },
        gyro: { x: 10.13, y: 0.14, z: 0.15 },
        accel: { x: 1.3, y: 1.0, z: 1.5 },
       
    },
    {        
        timestamp: '2024-07-10T12:48:19Z',
        coordinates: { latitude: 52.5200, longitude: 13.4050, altitude: 1000 },
        gyro: { x: 0.14, y: 0.15, z: 0.16 },
        accel: { x: 1.4, y: 1.1, z: 1.6 },
       
    },
    {       
        timestamp: '2024-07-10T12:49:19Z',
        coordinates: { latitude: 59.3293, longitude: 18.0686, altitude: 500 },
        gyro: { x: 0.15, y: 0.16, z: 0.17 },
        accel: { x: 1.5, y: 1.2, z: 1.7 },
        
    },
    {        
        timestamp: '2024-07-10T12:50:19Z',
        coordinates: { latitude: -34.6037, longitude: -58.3816, altitude: 2000 },
        gyro: { x: 0.16, y: 0.17, z: 0.18 },
        accel: { x: 1.6, y: 1.3, z: 1.8 },
        
    },
    {        
        timestamp: '2024-07-10T12:51:19Z',
        coordinates: { latitude: -12.0464, longitude: -77.0428, altitude: 3000 },
        gyro: { x: 0.17, y: 0.18, z: 0.19 },
        accel: { x: 1.7, y: 1.4, z: 1.9 },
      
    },
    {        
        timestamp: '2024-07-10T12:52:19Z',
        coordinates: { latitude: 28.6139, longitude: 77.2090, altitude: 2500 },
        gyro: { x: 0.18, y: 0.19, z: 0.20 },
        accel: { x: 1.8, y: 1.5, z: 2.0 },
      
    },
    {        
        timestamp: '2024-07-10T12:53:19Z',
        coordinates: { latitude: 39.9042, longitude: 116.4074, altitude: 1000 },
        gyro: { x: 0.19, y: 0.20, z: 0.21 },
        accel: { x: 1.9, y: 1.6, z: 2.1 },
        
    },
    {        
        timestamp: '2024-07-10T12:54:19Z',
        coordinates: { latitude: 55.7558, longitude: 37.6176, altitude: 500 },
        gyro: { x: 0.20, y: 0.21, z: 0.22 },
        accel: { x: 2.0, y: 1.7, z: 2.2 },
     
    }
];


export default insData;
