import { useState, useEffect, useCallback } from "react";
import { Project } from "@/components/types/project";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useProjectState = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const refreshProjects = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Project type
      const transformedProjects = data.map(project => ({
        id: project.id,
        name: project.name,
        address: project.address || "",
        type: project.type,
        teamMember: project.team_member?.[0] || "",
        startDate: project.start_date || "",
        endDate: project.end_date || "",
        description: project.description || "",
        phase: project.phase || "Phase 1",
        progress: project.progress || 0,
        status: project.status,
        budget: project.budget || "",
        risk: project.risk || "low",
        tasks: []
      }));

      setProjects(transformedProjects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error",
        description: "Failed to load projects. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Initial fetch of projects
  useEffect(() => {
    refreshProjects();
  }, [refreshProjects]);

  return {
    projects,
    setProjects,
    searchQuery,
    setSearchQuery,
    refreshProjects
  };
};