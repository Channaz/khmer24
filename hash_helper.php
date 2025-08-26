<?php

/**
 * Hash Helper Script for Testing Authentication
 * Run this script to see how the custom hashing works
 */

function customHash($string, $lower)
{
    return md5(md5(md5(trim($lower ? strtolower($string) : $string))));
}

echo "=== Hash Helper for Testing ===\n\n";

// Test data from the seeder
$testData = [
    ['phone' => '012345678', 'password' => 'channa'],
    ['phone' => '098765432', 'password' => 'password123'],
    ['phone' => '123456789', 'password' => 'admin123'],
];

foreach ($testData as $data) {
    $phoneHash = customHash($data['phone'], true);
    $passwordHash = customHash($data['password'], false);

    echo "Phone: {$data['phone']}\n";
    echo "Phone Hash: {$phoneHash}\n";
    echo "Password: {$data['password']}\n";
    echo "Password Hash: {$passwordHash}\n";
    echo "---\n";
}

echo "\n=== Postman Test Data ===\n\n";

foreach ($testData as $data) {
    echo "POST /public/auth/login\n";
    echo "Content-Type: application/json\n\n";
    echo json_encode([
        'phone_number' => $data['phone'],
        'password' => $data['password']
    ], JSON_PRETTY_PRINT);
    echo "\n\n---\n\n";
}