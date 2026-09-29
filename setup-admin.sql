-- Run this in Supabase SQL Editor to set up admin permissions
-- Required for admin panel to work properly

-- Allow anon role to manage students (insert, update, delete)
CREATE POLICY "anon_insert_students" ON students FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "anon_update_students" ON students FOR UPDATE TO anon USING (true) WITH CHECK (true);
CREATE POLICY "anon_delete_students" ON students FOR DELETE TO anon USING (true);

-- Enable RLS on bank_contoh with open access
ALTER TABLE bank_contoh ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all_bank_contoh" ON bank_contoh FOR ALL TO anon USING (true) WITH CHECK (true);

-- Enable RLS on tips_wawancara with open access
ALTER TABLE tips_wawancara ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anon_all_tips_wawancara" ON tips_wawancara FOR ALL TO anon USING (true) WITH CHECK (true);
