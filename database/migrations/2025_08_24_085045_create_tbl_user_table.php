<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tbl_user', function (Blueprint $table) {
            $table->integer('user_id', true)->primary();
            $table->string('first_name', 100);
            $table->string('last_name', 100);
            $table->string('email', 100)->nullable();
            $table->string('phone_number', 100);
            $table->string('password', 100);
            $table->boolean('is_active')->default(true);
            $table->integer('social_provider_id')->nullable();
            $table->enum('social_provider_type', ['facebook', 'google'])->nullable();
            $table->string('auth_token', 100)->nullable();
            $table->string('rem_token')->nullable();
            $table->bigInteger('rem_expiry')->nullable();
            $table->integer('created_by')->index('created_by')->nullable();
            $table->integer('updated_by')->index('updated_by')->nullable();
            $table->timestamps();
        });

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
                'auth_token' => md5(md5(md5('channa' . '012345678'))),
                'created_by' => 1,
                'updated_by' => 1,
            ],
        ];
        foreach ($users as $user) {
            DB::table('tbl_user')->insert($user);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tbl_user');
    }
};
