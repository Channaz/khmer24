<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Clear existing users
        DB::table('tbl_user')->truncate();

        $users = [
            [
                'first_name' => 'Channa',
                'last_name' => 'No',
                'email' => 'channa@example.com',
                'phone_number' => md5(md5(md5('012345678'))),
                'password' => md5(md5(md5('channa'))),
                'is_active' => true,
                'social_provider_id' => null,
                'social_provider_type' => null,
                'auth_token' => md5(md5(md5('channa'))),
                'rem_token' => null,
                'rem_expiry' => null,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Test',
                'last_name' => 'User',
                'email' => 'test@example.com',
                'phone_number' => md5(md5(md5('098765432'))),
                'password' => md5(md5(md5('password123'))),
                'is_active' => true,
                'social_provider_id' => null,
                'social_provider_type' => null,
                'auth_token' => md5(md5(md5('testuser'))),
                'rem_token' => null,
                'rem_expiry' => null,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'first_name' => 'Admin',
                'last_name' => 'User',
                'email' => 'admin@example.com',
                'phone_number' => md5(md5(md5('123456789'))),
                'password' => md5(md5(md5('admin123'))),
                'is_active' => true,
                'social_provider_id' => null,
                'social_provider_type' => null,
                'auth_token' => md5(md5(md5('adminuser'))),
                'rem_token' => null,
                'rem_expiry' => null,
                'created_by' => 1,
                'updated_by' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($users as $user) {
            DB::table('tbl_user')->insert($user);
        }
    }
}
